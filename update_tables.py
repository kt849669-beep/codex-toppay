import os
import glob

pages_dir = r"c:\Users\DELL\OneDrive\Desktop\New folder\toppay3.0\admin-app\pages"
html_files = glob.glob(os.path.join(pages_dir, "*.html"))

for file_path in html_files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Simple check if there's a table that is not already wrapped
    if "<table>" in content and '<div class="table-responsive">' not in content:
        content = content.replace("<table>", '<div class="table-responsive">\n            <table>')
        content = content.replace("</table>", '</table>\n          </div>')
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {file_path}")
