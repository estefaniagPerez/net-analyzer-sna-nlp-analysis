from . import create_app
import logging
import sys

logging.basicConfig(
    level=logging.ERROR,  # Set the logging level
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',  # Log message format
    stream=sys.stdout  # Output to standard output
)
logger = logging.getLogger(__name__)
app = create_app()

if __name__ == "__main__":
    logger.info('Started') 
    app.run()
    logger.info('Finished')
