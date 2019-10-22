import os
from time import sleep
from json import dumps

from selenium import webdriver

login = os.environ["VULCAN_LOGIN"]
password = os.environ["VULCAN_PASSWORD"]

driver = webdriver.Chrome(executable_path='./get_lucky/chromedriver')
driver.get("https://cufs.vulcan.net.pl/poznan/Account/LogOn?ReturnUrl=%2Fpoznan%2FFS%2FLS%3Fwa%3Dwsignin1.0%26wtrealm%3Dhttps%253a%252f%252fuonetplus.vulcan.net.pl%252fpoznan%252fLoginEndpoint.aspx%26wctx%3Dhttps%253a%252f%252fuonetplus.vulcan.net.pl%252fpoznan%252fLoginEndpoint.aspx")

login_input = driver.find_element_by_id("LoginName")
password_input = driver.find_element_by_id("Password")

login_input.send_keys(login)
password_input.send_keys(password)
password_input.submit()


sleep(2)
cookies = driver.get_cookies()
permissions = driver.execute_script("return VParam.permissions")

driver.quit()
url = 'https://uonetplus.vulcan.net.pl/poznan/Start.mvc/GetKidsLuckyNumbers'

print('curl', url, end='')
print(' -H \'cookie: ', end='')
for cookie in cookies:
    print(f"{cookie['name']}={cookie['value']}", end='; ')
print('\' ', end='')
print('--data \'permissions=', end='')
print(permissions, end='')
print('\'')