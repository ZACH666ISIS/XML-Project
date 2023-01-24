<?php
    function getStore($document,$idStore){
        $stores = $document->documentElement;  
        foreach($stores->childNodes as $store){
            if ($store->nodeType == XML_ELEMENT_NODE)
               if(strcmp($store->getAttribute('id'),$idStore) == 0){
                    return $store;
               }
        }
    }
    
    function gen_uuid() {

        return hexdec(uniqid());
    }

?>