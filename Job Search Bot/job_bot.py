from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import pandas as pd

# --- SETTINGS ---
JOB_KEYWORD = "software engineer"
JOB_LOCATION = "Berlin"
CV_PATH = r"C:\Users\SHOP WITH HOPE\Desktop\CV\Saifullah Bin Naseer - CV.pdf"
NAME = "Saifullah Bin Naseer"
EMAIL = "Saifullahnaseer7@gmail.com"
PHONE = "+4915756399833"
COVER_LETTER = "Dear Hiring Manager, I am writing to express my interest in technical, engineering, and documentation-focused positions. With a background in Electrical and Electronics Engineering and proven experience as a Technical Writer, Information Engineer, and Engineering Consultant, I offer a unique combination of hands-on technical expertise, advanced documentation skills, and cross-functional collaboration experience. In my career, I have specialized in standards compliance, safety-critical documentation, and process optimization. My work has included authoring user manuals, standard operating procedures, technical specifications, training guides, and regulatory compliance reports. I have successfully collaborated with engineering, QA, and product management teams to ensure content accuracy, clarity, and adherence to ISO, IEC, and IEEE standards. My engineering experience includes VFD programming, solar PV system design, power distribution, load analysis, troubleshooting, preventive maintenance, and risk assessments. This is complemented by my proficiency in documentation and engineering tools such as Microsoft Office Suite, Adobe FrameMaker, MadCap Flare, AutoCAD, MATLAB, Jira, Confluence, and SharePoint. Core strengths include: Technical writing and documentation management for diverse audiences. Electrical and electronics engineering with a focus on renewable energy and control systems. Compliance with industry standards and safety regulations. Project coordination, cross-team communication, and milestone tracking. Troubleshooting, diagnostics, and preventive maintenance planning. I bring the ability to translate complex technical concepts into clear, accessible documentation while also contributing to the design, development, and optimization of engineering solutions. I am confident that my multidisciplinary background allows me to add value in both technical and documentation capacities, ensuring accuracy, usability, and compliance in every project. Thank you for considering my application. I welcome the opportunity to contribute my skills, experience, and commitment to excellence to your team. Sincerely, Saifullah Bin Naseer"
OUTPUT_FILE = "applied_jobs.csv"

# --- LAUNCH BROWSER ---
driver = webdriver.Chrome()
driver.maximize_window()

# --- SEARCH FOR JOBS ---
driver.get("https://de.indeed.com")
time.sleep(2)

driver.find_element(By.ID, "text-input-what").send_keys(JOB_KEYWORD)
driver.find_element(By.ID, "text-input-where").clear()
driver.find_element(By.ID, "text-input-where").send_keys(JOB_LOCATION)
driver.find_element(By.CLASS_NAME, "yosegi-InlineWhatWhere-primaryButton").click()
time.sleep(3)

applied_jobs = []

# --- LOOP THROUGH JOB CARDS ---
job_cards = driver.find_elements(By.CLASS_NAME, "job_seen_beacon")

for card in job_cards:
    try:
        card.click()
        time.sleep(2)
        
        # Switch to job detail pane
        job_title = driver.find_element(By.CLASS_NAME, "jobsearch-JobInfoHeader-title").text
        company = driver.find_element(By.CLASS_NAME, "jobsearch-CompanyInfoWithoutHeaderImage").text
        
        # Click Apply
        apply_button = driver.find_element(By.CLASS_NAME, "ia-IndeedApplyButton")
        apply_button.click()
        time.sleep(2)
        
        # Fill in application form
        try:
            driver.find_element(By.NAME, "fullname").send_keys(NAME)
            driver.find_element(By.NAME, "email").send_keys(EMAIL)
            driver.find_element(By.NAME, "phoneNumber").send_keys(PHONE)
        except:
            pass  # Some forms pre-fill

        # Upload CV
        driver.find_element(By.NAME, "resume").send_keys(CV_PATH)
        
        # Fill cover letter
        try:
            driver.find_element(By.NAME, "coverletter").send_keys(COVER_LETTER)
        except:
            pass
        
        # Submit
        driver.find_element(By.CLASS_NAME, "icl-Button").click()
        time.sleep(2)
        
        applied_jobs.append({"Job Title": job_title, "Company": company, "Status": "Applied"})
    
    except Exception as e:
        print("Skipped a job:", e)
        continue

# --- SAVE LOG ---
pd.DataFrame(applied_jobs).to_csv(OUTPUT_FILE, index=False)

driver.quit()
print("✅ All done! Applied to", len(applied_jobs), "jobs.")
