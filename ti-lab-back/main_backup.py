from fastapi import FastAPI

app = FastAPI(title="TI-LAB Backend")

@app.get("/")
def root():
    return {"message": "TI-LAB Backend funcionando 🚀"}
