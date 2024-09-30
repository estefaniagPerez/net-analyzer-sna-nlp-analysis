from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from ..analyzers.analysis_sna.sna_analysis import AnalysisFactory
from ..logic import calculate_risk as risk

router = APIRouter(prefix="/api", default_response_class=JSONResponse, tags=["API"])


@router.get('/users_risks/hs/{user_id}')
async def api_users(user_id: str, is_influencer: bool = False, is_bridge: bool = False):
    r = risk.caluclate_risk_hatespeech(user_id, is_influencer, is_bridge)
    if r == None or len(r) < 1:
        return {"status": -1, "risk": None}
    return {"status": 1, "risk": r}


@router.get("/graph/{data_name}")
async def api_users(data_name: str):
    sna = AnalysisFactory(0)
    if not sna == None:
        graph_data = sna.analyze_graph(data_name)
        status = 1
        if graph_data == None:
            status = 0
            graph_data = {}
        else:
            status = 1
        return {"status": status, "graph_data": graph_data}
    
