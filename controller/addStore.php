<?php
    require 'commun.php';
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $idStore = gen_uuid();
        $name = $_POST['name'];
        $date = date("Y-m-d");
        $document = new DomDocument;
        $document->load('../stores.xml');
        $stores = $document->documentElement;
        $stores->appendChild(createStore($document,$name,$idStore,$date));
        $document->save('../stores.xml');
        header('Location: ../stores.xml');
    }


    function createStore($document,$name,$idStore,$date){
        $store = $document->createElement("store");
        $store->setAttribute("id","S".$idStore);
        $store->setAttribute("name",$name);
        $store->setAttribute("registration",$date);
        $employees = $document->createElement("employees");
        $products = $document->createElement("products");
        $store->appendChild($employees);
        $store->appendChild($products);
        return $store;
    }

?>