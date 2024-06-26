from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

@app.route('/update_excel', methods=['POST'])
def update_excel():
    data = request.json
    article_number = data['info']
    quantity = request.args.get('quantity', 1)  # Default quantity is 1

    file_path = 'path_to_your_OneDrive_excel_file.xlsx'
    
    # Excel-Datei laden
    df = pd.read_excel(file_path)
    
    # Artikelnummer (Info) finden und Stückzahl aktualisieren
    if article_number in df['Info'].values:
        df.loc[df['Info'] == article_number, 'Stückzahl'] += quantity
    else:
        return jsonify({"message": "Artikelnummer nicht gefunden."}), 404
    
    # Änderungen speichern
    df.to_excel(file_path, index=False)
    return jsonify({"message": f"Artikelnummer: {article_number} mit Stückzahl: {quantity} wurde erfolgreich aktualisiert."})

if __name__ == '__main__':
    app.run(debug=True)
