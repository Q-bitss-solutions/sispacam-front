# Generated by Selenium IDE
import pytest
import time
import json
import random
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.support.ui import Select
from selenium.webdriver.chrome.options import Options

class TestCc5764():
  def setup_method(self, method):
    options = Options()
    options.binary_location = '/usr/bin/google-chrome-beta'      
    self.driver = webdriver.Chrome(options = options)    
    self.vars = {}
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_cc5764(self):
    scroll400 = "window.scrollTo(0,400)"
    self.driver.get("http://localhost:8080/")
    self.driver.maximize_window()
    time.sleep(5)               
    user = self.driver.find_element(By.ID, "user")
    user.send_keys("jose.cruz")           
    pwd = self.driver.find_element(By.ID, "contrasenia")
    pwd.send_keys("internet")  
    time.sleep(5) 
    self.driver.find_element(By.ID, "sbtlogin").click()         
    time.sleep(5) 
    self.driver.get("http://localhost:8080/presupuesto/1-OAX-O")
    time.sleep(5)    
    option_conceptos = Select(self.driver.find_element_by_id("sconceptos"))
    option_conceptos.select_by_index(1)
    time.sleep(2)    
    self.driver.execute_script(scroll400)
    option_conceptos.select_by_index(2)
    time.sleep(2)    
    self.driver.execute_script(scroll400)
    option_conceptos.select_by_index(3)
    self.driver.execute_script(scroll400)
    time.sleep(2)    
    option_conceptos.select_by_index(4)
    self.driver.execute_script(scroll400)
    time.sleep(2)    
    option_conceptos.select_by_index(5)
    self.driver.execute_script(scroll400)
    time.sleep(2)    
    self.driver.execute_script(scroll400)    
    option_conceptos.select_by_index(0)
    self.driver.execute_script(scroll400)
    time.sleep(2)    
    importe = self.driver.find_elements_by_class_name('cantidad-total')    
    for item in importe:
        try:
            n = random.randint(0,22)
            item.clear()
            item.send_keys(n) 
            print (n)
            time.sleep(1)    
        except Exception:
            print('exption')
    self.driver.execute_script(scroll400)
    time.sleep(5)   
    importe = self.driver.find_elements_by_class_name('precio-unitario')    
    for item in importe:
        try:
            n = random.randint(0,22)
            item.clear()
            item.send_keys(n) 
            print (n)
            time.sleep(1)    
        except Exception:
            print('exption')
    self.driver.execute_script(scroll400)
    time.sleep(5)       



    


    