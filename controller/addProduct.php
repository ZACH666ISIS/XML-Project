<?php
    require 'commun.php';
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $idStore = $_POST['idStore'];
        $name = $_POST['name'];
        $description = $_POST['description'];
        $price = $_POST['price'];
        $stock = $_POST['stock'];
        $images = $_FILES['images'];
        

        $document = new DomDocument;
        $document->load('../stores.xml');
        $store = getStore($document,$idStore);
        $products = $store->getElementsByTagName('products')->item(0);
        $product = createProduct($document,$images,$name,$description,$price,$stock);
        $products->appendChild($product);
        $document->save('../stores.xml');
        header('Location: ../stores.xml');
    }





    function createProduct($document,$files,$n,$des,$pr,$stk){
        $product = $document->createElement("product");
        $idP = gen_uuid();
        mkdir("../img/products/P".$idP);
        $name = $document->createElement("name");
        $description = $document->createElement("description");
        $price = $document->createElement("price");
        $stock = $document->createElement("stock");
        $name->appendChild($document->createTextNode($n));
        $description->appendChild($document->createTextNode($des));
        $price->appendChild($document->createTextNode($pr));
        $stock->appendChild($document->createTextNode($stk));
        $product->setAttribute("barCode","P".$idP);
        $product->appendChild($name);
        $product->appendChild($description);
        $product->appendChild($price);
        $product->appendChild($stock);
        $product->appendChild(createImages($document,$files,"P".$idP));
        return $product;
    }

    function createImages($document,$files,$idP){
        $photos =  $document->createElement("photos");
        $file_ary = reArrayFiles($_FILES['images']);
        foreach($file_ary as $file){
            $idPhoto = gen_uuid();
            $pathImg = uploadImage($file['name'],$file['tmp_name'],$idP,$idPhoto);
            $photo = $document->createElement("photo");
            $photo->setAttribute("id","PE".$idPhoto);
            $photo->setAttribute("source",$pathImg);
            $photos->appendChild($photo); 
        }
        return $photos;

    }


    function uploadImage($imageName,$imageTmpName,$idP,$id) {
        $source = "img/products/".$idP;
        $target_dir = "../".$source;
        $target_file = $target_dir . "/PP" . $id;
        $ext = strtolower(pathinfo(basename($imageName),PATHINFO_EXTENSION));
        if($ext != "jpg" && $ext != "png" && $ext != "jpeg" && $ext != "gif" ) {
            return;
        }
    
        if (!move_uploaded_file($imageTmpName, $target_file.".".$ext)) {
           return;
        } 
    
        return $source."/PP".$id.".".$ext;
    
     }

     function reArrayFiles(&$file_post) {

        $file_ary = array();
        $file_count = count($file_post['name']);
        $file_keys = array_keys($file_post);
    
        for ($i=0; $i<$file_count; $i++) {
            foreach ($file_keys as $key) {
                $file_ary[$i][$key] = $file_post[$key][$i];
            }
        }
    
        return $file_ary;
    }


  
?>