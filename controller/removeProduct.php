<?php
    require 'commun.php';
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $idStore = $_POST['idStore'];
        $barCode = $_POST['idProd'];

        $document = new DomDocument;
        $document->load('../stores.xml');
        $store = getStore($document,$idStore);
        $product = getProduit($store,$barCode);
        $product->parentNode->removeChild($product);
        $document->save('../stores.xml');
        header('Location: ../stores.xml');
    }


    function getProduit($store,$barCode){

        $products = $store->getElementsByTagName('products')->item(0);
        foreach($products->childNodes as $product){
            if ($product->nodeType == XML_ELEMENT_NODE)
               if(strcmp($product->getAttribute('barCode'),$barCode) == 0){
                    return $product;
               }
        }
    }
?>