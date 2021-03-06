import os
import pikepdf

urls = []

for filename in os.listdir(os.path.join(os.getcwd(),"students_resumes")):
    with pikepdf.Pdf.open(os.path.join(os.path.join(os.getcwd(),"students_resumes"), filename)) as f:
        for page in f.pages:
            try:
                for annots in page.get("/Annots"):
                    uri = annots.get("/A").get("/URI")
                    if uri is not None:
                        #print("[+] URL Found:", uri)
                        urls.append(uri)
            except TypeError as e:
                continue

f1 = open("links.txt", "w")
for uri in urls:
    f1.write(str(uri))
    f1.write("\n")
f1.close()