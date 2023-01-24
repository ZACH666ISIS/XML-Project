<?php
require 'commun.php';
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $idStore = $_POST['idStore'];
    $idEmployee = gen_uuid();
    $idPhoto = gen_uuid();
    $fName = $_POST['fName'];
    $lName = $_POST['lName'];
    $salary = $_POST['salary'];
    $grade = $_POST['grade'];
    $dob = $_POST['dob'];
    $photo = $_FILES['photo'];
    $pathImg = uploadPhoto($photo,$idPhoto);
    

    $document = new DomDocument;
    $document->load('../stores.xml');
    $store = getStore($document,$idStore);
    $employees = $store->getElementsByTagName('employees')->item(0);
    $employee = createEmployee($document,$idEmployee,$fName,$lName,$salary,$dob,$pathImg,$idPhoto,$grade);
    $employees->appendChild($employee);
    $document->save('../stores.xml');
    header('Location: ../stores.xml');
}


function createEmployee($document,$idEmployee,$fName,$lName,$salary,$dob,$pathImg,$idPhoto,$grade){
    $employee =  $document->createElement("employee");
    $employee->setAttribute("id","E".$idEmployee);
    $employee->setAttribute("grade",$grade);
    $firstName = $document->createElement("firstName");
    $lastName = $document->createElement("lastName");
    $dateofBirth = $document->createElement("dateOfBirth");
    $slry = $document->createElement("salary");
    $photo = $document->createElement("photo");
    $firstName->appendChild($document->createTextNode($fName));
    $lastName->appendChild($document->createTextNode($lName));
    $dateofBirth->appendChild($document->createTextNode($dob));
    $slry->appendChild($document->createTextNode($salary));
    $photo->setAttribute("id","PE".$idPhoto);
    $photo->setAttribute("source",$pathImg);
    $employee->appendChild($firstName);
    $employee->appendChild($lastName);
    $employee->appendChild($dateofBirth);
    $employee->appendChild($slry);
    $employee->appendChild($photo);
    return $employee;
}



function uploadPhoto($photo,$id) {
    $source = "img/employees/";
    $target_dir = "../".$source;
    $target_file = $target_dir . "PE" . $id;
    $uploadOk = 1;
    $ext = strtolower(pathinfo(basename($photo['name']),PATHINFO_EXTENSION));




    if (!move_uploaded_file($photo['tmp_name'], $target_file.".".$ext)) {
       return;
    } 

    return $source."PE".$id.".".$ext;

  }

?>