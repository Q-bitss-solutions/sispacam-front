#Implementation of Selenium test automation for this Selenium Python Tutorial
import pytest
from selenium import webdriver
import sys
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from time import sleep
from selenium.webdriver.chrome.options import Options


class TestCatalogoPartidas():
    def setup_method(self):
        self.driver = webdriver.Chrome('/home/diego/webdriver/chromedriver')

    def test_lambdatest_todo_app(self):
        scroll400 = "window.scrollTo(0,400)"
        scroll10000 = "window.scrollTo(0,2300)"
        #self.driver.get("https://cmqa.sct.gob.mx/")
        self.driver.get("http://192.168.1.73:8080/")
        self.driver.maximize_window()
        time.sleep(3) 
        user = self.driver.find_element(By.ID, "user")
        user.send_keys("normativo1")           
        pwd = self.driver.find_element(By.ID, "contrasenia")
        pwd.send_keys("internet")  
        time.sleep(3)         
        login = self.driver.find_element(By.ID, "sbtlogin")
        login.click()         
        time.sleep(3) 
        self.driver.get("http://192.168.1.73:8080/presupuesto/3-BCN-A/2019/2/131/2/")
        time.sleep(3) 
        self.driver.find_element_by_link_text("PRESUPUESTO REAL").click()
        self.driver.execute_script(scroll10000)      
        time.sleep(3) 
        self.driver.find_element(By.ID, 'btn-add-partida').click()     
        time.sleep(3) 
        self.driver.find_element(By.XPATH, '//*[text()="Administrar Catalogo"]').click()           
        time.sleep(3) 
        self.driver.find_element(By.XPATH, '//*[text()="Nueva Partida"]').click()           
        time.sleep(2)       
        concepto  = self.driver.find_element(By.ID, "concepto")
        concepto.send_keys("ROBOTFRAMEWORK CONCEPTO PRUEBA")
        time.sleep(2)       
        unidad = Select(self.driver.find_element_by_id("unidad"))
        unidad.select_by_index(2)  
        time.sleep(2)       
        unitario  = self.driver.find_element(By.ID, "unitario")
        unitario.send_keys("65.20")             
        time.sleep(2)    
        self.driver.find_element(By.XPATH, '//*[text()="Guardar"]').click()           
        time.sleep(2)            
        self.driver.close()        