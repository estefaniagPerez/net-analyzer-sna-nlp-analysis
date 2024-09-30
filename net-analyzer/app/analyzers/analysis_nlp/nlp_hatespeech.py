import sparknlp
from sparknlp.base import DocumentAssembler, Finisher
from sparknlp.annotator import Tokenizer, BertForSequenceClassification
from pyspark.ml import Pipeline
from pyspark.sql.functions import col
import logging
logger = logging.getLogger(__name__)

spark = sparknlp.start()
documentAssembler = DocumentAssembler() \
    .setInputCol("text") \
    .setOutputCol("document")

tokenizer = Tokenizer() \
    .setInputCols("document") \
    .setOutputCol("token")

seq_classifier = BertForSequenceClassification.pretrained("bert_classifier_bert_base_uncased_hatexplain","en") \
    .setInputCols(["document", "token"]) \
    .setOutputCol("class")

pipeline = Pipeline(stages=[documentAssembler, tokenizer, seq_classifier])
# Fit on dummy data to initialize pipeline and avoid memory overhead
dummy_data = spark.createDataFrame([["I hate you"]]).toDF('text')
fitted_pipeline = pipeline.fit(dummy_data)             

def analyze_hatespeech(msgs):
    hate_list = []
    try:
        if not isinstance(msgs, list):
            raise TypeError("Expected 'msgs' to be a list of strings.")

        data_frame = [(i + 1, m) for i, m in enumerate(msgs)]
        data = spark.createDataFrame(data_frame, ["id", "text"])
        
        result = fitted_pipeline.transform(data)
        result = result.withColumn("prediction", col("class").getItem(0).getField("result"))
        result = result.withColumn("is_offensive", col("prediction") == "hate speech")
        hate_list = [row["is_offensive"] for row in result.select("is_offensive").collect()]
        #return hate_list
    except Exception as e:
        logger.error(e)
    finally:
        return hate_list