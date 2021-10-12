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


class TestEsportarArchivosConsultaSIA():
    def setup_method(self):
        self.driver = webdriver.Chrome('/home/diego/webdriver/chromedriver')

    def test_lambdatest_todo_app(self):
        scroll400 = "window.scrollTo(0,400)"
        scroll10000 = "window.scrollTo(0,2300)"
        #self.driver.get("https://cmqa.sct.gob.mx/")
        self.driver.get("https://cmqa.sct.gob.mx/")
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
        self.driver.find_element_by_link_text("Buscar por Clave única de Obra").click()     
        time.sleep(3)   
        icveObra = self.driver.find_element(By.ID, "icveObra")
        icveObra.send_keys("4-CHP-C") 
        time.sleep(3)   
        self.driver.find_element(By.ID, "buscarObras").click()    
        time.sleep(3)  
        result = self.driver.find_elements_by_class_name('editObra')[0].click()    
        time.sleep(5)          
        self.driver.find_element_by_link_text("Programación").click() 
        time.sleep(3)
        self.driver.find_element(By.ID, "bt-nvo-convenio").click()   
        time.sleep(3)
        option_conceptos = Select(self.driver.find_element_by_id("anio"))
        option_conceptos.select_by_index(1)
        time.sleep(2)
        icveObra = self.driver.find_element(By.ID, "tramo")
        icveObra.send_keys("PY-2001") 
        time.sleep(3)        
        icveObra = self.driver.find_element(By.ID, "monto")
        icveObra.send_keys("2") 
        time.sleep(3)   
        icveObra = self.driver.find_element(By.ID, "meta")
        icveObra.send_keys("2") 
        time.sleep(3)           
        option_conceptos = Select(self.driver.find_element_by_id("origen"))
        option_conceptos.select_by_index(1)
        time.sleep(2) 
        self.driver.find_element(By.XPATH, '//*[text()="Agregar Convenio"]').click()    
        time.sleep(3)   
        self.driver.find_element(By.XPATH, '//*[text()="Cerrar"]').click()               
        time.sleep(3)   
        self.driver.close()        