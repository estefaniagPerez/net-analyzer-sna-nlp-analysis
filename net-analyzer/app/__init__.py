from fastapi import FastAPI, Request
from pathlib import Path
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from .routers import api, spa
import os

description = """
ChimichangApp API helps you do awesome stuff. 🚀

## Items

You can **read items**.

## Users

You will be able to:

* **Create users** (_not implemented_).
* **Read users** (_not implemented_).
"""

def create_app() -> FastAPI:
    app = FastAPI(    
        title="ChimichangApp",
        description=description,
        summary="Deadpool's favorite app. Nuff said.",
        version="0.0.1",
        terms_of_service="http://example.com/terms/",
        contact={
            "name": "Deadpoolio the Amazing",
            "url": "http://x-force.example.com/contact/",
            "email": "dp@x-force.example.com",
        },
        license_info={
            "name": "Apache 2.0",
            "url": "https://www.apache.org/licenses/LICENSE-2.0.html"})

    # Load configuration
    #app.config.from_object('app.config.Config')

    # Serve SPA
    app.mount("/static", StaticFiles(directory='app/react-app/dist', html=True), name="spa")

    # Register backend routes
    app.include_router(api.router)

    # Register spa main page routes
    app.include_router(spa.router)

    return app
