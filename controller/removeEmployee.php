<?php
    require 'commun.php';
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $idStore = $_POST['idStore'];
        $idEmp = $_POST['idEmp'];

        $document = new DomDocument;
        $document->load('../stores.xml');
        $store = getStore($document,$idStore);
        $employee = getEmployee($store,$idEmp);
        $employee->parentNode->removeChild($employee);
        $document->save('../stores.xml');
        header('Location: ../stores.xml');
    }


    function getEmployee($store,$idEmp){

        $employees = $store->getElementsByTagName('employees')->item(0);
        foreach($employees->childNodes as $employee){
            if ($employee->nodeType == XML_ELEMENT_NODE)
               if(strcmp($employee->getAttribute('id'),$idEmp) == 0){
                    return $employee;
               }
        }
    }
?>