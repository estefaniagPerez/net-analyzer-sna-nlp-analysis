from fastapi import APIRouter
from fastapi.responses import FileResponse

router = APIRouter()

# Catch any route not defined and returns the index SPA page
@router.get("{full_path:path}", include_in_schema=False)
async def serve_spa(full_path: str):
    
    if "assets" in full_path:
        return FileResponse("app/react-app/dist/" + full_path)
    return FileResponse("app/react-app/dist/index.html")
