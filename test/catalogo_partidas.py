#Implementation of Selenium test automation for this Selenium Python Tutorial
import pytest
from selenium import webdriver
import sys
import time
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from time import sleep
from selenium.webdriver.chrome.options import Options


class TestCatalogoPartidas():
    def setup_method(self):
        options = Options()
        options.binary_location = '/home/diego/webdriver/chromedriver'      
        self.driver = webdriver.Chrome('/home/diego/webdriver/chromedriver')    
        self.vars = {}

    def teardown_method(self):
        self.driver.quit()

    def test_lambdatest_todo_app(self):
        scroll400 = "window.scrollTo(0,400)"
        self.driver.get("https://cmqa.sct.gob.mx/")
        self.driver.maximize_window()
        time.sleep(5) 
        
        sleep(2)
        self.driver.close()