<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                exclude-result-prefixes="xs"
                version="2.0">
    <xsl:template match="/">

        <html>

            <head>
                <meta charset="utf-8"/>
                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
                <title>Store Manager</title>
                <meta name="description" content=""/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="apple-touch-icon" href="apple-touch-icon.png"/>
                <link rel="stylesheet" href="css/fontAwesome.css"/>
                <link rel="stylesheet" href="css/style.css"/>
                <link href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700,800,900"
                      rel="stylesheet"/>
                <script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
            </head>

            <body>

                <div class="overlay"></div>
                <section class="pageBackground">
                    <img class="background" src="img/background.jpg"/>
                </section>


                <section class="cd-hero">

                    <div class="cd-slider-nav">
                        <nav>
                            <span class="cd-marker item-1"></span>
                            <img id="scroll_left" class="btn-prev" src="img/prev.png"/>
                            <img id="scroll_right" class="btn-next" src="img/next.png"/>
                            <ul id="elements_scroll">
                                <li class="selected">
                                    <a href="#0">
                                        <div class="image-icon">
                                            <img class="ic" src="img/home-icon.png"/>
                                        </div>
                                        <h6>Welcome</h6>
                                    </a>
                                </li>
                                <xsl:for-each select="/stores/store">
                                    <li>
                                        <a href="#0">
                                            <input type="hidden" id="storeID" name="id" value="{@id}"/>
                                            <div class="image-icon">
                                                <img class="ic" src="img/store.png"/>
                                            </div>
                                            <h6>
                                                <xsl:value-of select="@name"/>
                                            </h6>
                                        </a>
                                    </li>
                                </xsl:for-each>
                            </ul>
                        </nav>
                    </div>
                    <ul class="cd-hero-slider">

                        <li class="selected">
                            <div class="heading home">
                                <h1>Welcome in our Store Management</h1>
                                <span>To add a store just enter the name and apply
                                </span>
                                <div>
                                    <form id="addStore" class="form" method="post" action="controller/addStore.php">
                                        <div class="element-form">
                                            <label for="name">Name</label>
                                            <input type="text" id="name" name="name"/>
                                        </div>
                                        <button type="submit">ADD STORE</button>
                                    </form>
                                </div>
                            </div>
                        </li>

                        <xsl:apply-templates select="/stores"/>

                    </ul>
                </section>

                <section id="image-popUp">
                    <div class="show">
                        <div id="exit-popUp-show" class="exit">
                            <img src="img/cross.png"/>
                        </div>
                        <img src="img/item-02.jpg" id="img-popUp-src"/>
                    </div>
                </section>

                <section id="popUp-delete-employee">
                    <div class="question">
                        <div id="exit-popUp-employee" class="exit">
                            <img src="img/cross.png"/>
                        </div>
                        <div class="informations">
                            Sure you want to delete this employee
                            <span id="employee-id"></span>
                        </div>
                        <div class="response">
                            <div id="responseEmp" class="container">
                                <button id="cancel-del-employee" class="not">NO</button>
                                <button id="send-delEmp" class="agree" type="submit">YES</button>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="popUp-delete-product">
                    <div class="question">
                        <div id="exit-popUp-prod" class="exit">
                            <img src="img/cross.png"/>
                        </div>
                        <div class="informations">
                            Sure you want to delete this product
                            <span id="product-id"></span>
                        </div>
                        <div class="response">
                            <div id="responseProd" class="container">
                                <button id="cancel-del-prod" class="not">NO</button>
                                <button id="send-delProd" class="agree">YES</button>
                            </div>
                        </div>
                    </div>
                </section>


                <section id="addProd">
                    <div class="show">
                        <div id="exit-popUp-addProd" class="exit exit-popUp">
                            <img src="img/cross.png"/>
                        </div>
                        <span>Add product</span>
                        <form id="form" class="form-popUp" action="addProduct.php">
                            <div class="element-form">
                                <label for="name">Name</label>
                                <input type="text" id="name" name="name" required="required"/>
                            </div>
                            <div class="element-form">
                                <label for="description">Description</label>
                                <input type="text" id="description" name="description" required="required"/>
                            </div>
                            <div class="element-form">
                                <label for="price">Price</label>
                                <input type="text" id="price" name="price" required="required"/>
                            </div>
                            <div class="element-form">
                                <label for="stock">Stock</label>
                                <input type="text" id="stock" name="stock" required="required"/>
                            </div>
                            <div class="element-form">
                                <label for="images">Images</label>
                                <input type="file" id="images-products" name="images[]" required="required"/>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </section>

                <section id="addEmp">
                    <div class="show">
                        <div id="exit-popUp-addEmp" class="exit exit-popUp">
                            <img src="img/cross.png"/>
                        </div>
                        <span>Add Employee</span>
                        <form id="form" class="form-popUp" action="addEmployee.php">
                            <div class="element-form">
                                <label for="fName">First Name</label>
                                <input type="text" id="fName" name="fName"/>
                            </div>
                            <div class="element-form">
                                <label for="lName">Last Name</label>
                                <input type="text" id="lName" name="lName"/>
                            </div>
                            <div class="element-form">
                                <label for="salary">Salary</label>
                                <input type="text" id="salary" name="salary"/>
                            </div>
                            <div class="element-form">
                                <label for="dob">Date Of Birth</label>
                                <input type="date" id="dob" name="dob"/>
                            </div>
                            <div class="element-form">
                                <label for="grade">Grade</label>
                                <select name="grade" id="grade">
                                    <option value="MANAGER">MANAGER</option>
                                    <option value="SELLER">SELLER</option>
                                    <option value="MAINTAINER">MAINTAINER</option>
                                </select>
                            </div>
                            <div class="element-form">
                                <label for="photo">Photo</label>
                                <input type="file" id="pid" name="photo"/>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </section>

                <footer>
                    <p>Copyright
                        <em>MQL FSDM</em>
                    </p>
                </footer>

                <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
                <script src="js/vendor/jquery-1.11.2.min.js"></script>
                <script src="js/jeq.js"></script>
                <script src="js/main.js"></script>

            </body>
        </html>

    </xsl:template>


    <xsl:template name="stores" match="/stores">
        <xsl:for-each select="store">
            <li>
                <div class="heading">
                    <h1>
                        <xsl:value-of select="@name"/>
                    </h1>
                    <div class="ourStore">

                        <img class="btn-prev prev-product" src="img/prev.png"/>
                        <div class="productsV">
                            <span>Products</span>
                            <div class="products">
                                <xsl:apply-templates select="products"/>
                            </div>
                        </div>
                        <img class="btn-next next-product" src="img/next.png"/>
                        <img class="btn-prev prev-employee" src="img/prev.png"/>
                        <div class="employeesV">
                            <span>Employees</span>
                            <div class="employees">
                                <xsl:apply-templates select="employees"/>
                            </div>
                        </div>
                        <img class="btn-next next-employee" src="img/next.png"/>
                    </div>
                    <div class="add-prod-emp">
                        <button class="btn-addProd">ADD Product</button>
                        <button class="btn-addEmp">ADD Employee</button>
                    </div>
                </div>
            </li>
        </xsl:for-each>
    </xsl:template>


    <xsl:template name="products" match="/stores/store/products">
        <xsl:for-each select="product">
            <div class="product">
                <div class="container">
                    <div class="btn-img delete-product">
                        <input type="hidden" id="barCode" name="id" value="{@barCode}"/>
                        <img src="img/delete.png"/>
                    </div>
                    <div class="btn-img btn-images-up">UP</div>
                    <div class="btn-img btn-down btn-images-down">DOWN</div>
                    <div class="product-image-slider">
                        <div class="images images-pane">
                            <xsl:for-each select="photos/photo">
                                <img class="product-img img" src="{@source}"/>
                            </xsl:for-each>
                        </div>
                        <img class="product-img main-img img" src="{(photos/photo/@source)[1]}"/>
                    </div>
                </div>
                <div class="info-product">
                    <span class="product-name">
                        <xsl:value-of select="name"/>
                    </span>
                    <div class="description">
                        <h5 class="description">
                            <xsl:value-of select="description"/>
                        </h5>
                    </div>
                    <div class="price">
                        <span class="price">
                            <xsl:value-of select="price"/>
                        </span>
                    </div>
                    <div class="stock">
                        <span class="stock">
                            <xsl:value-of select="stock"/>
                        </span>
                    </div>
                </div>
            </div>
        </xsl:for-each>
    </xsl:template>


    <xsl:template name="employees" match="/stores/store/employees">
        <xsl:for-each select="employee">
            <div class="employee">
                <div class="btn-img delete-employee">
                    <input id="idEmployee" type="hidden" name="id" value="{@id}"/>
                    <img src="img/delete.png"/>
                </div>

                <div class="employee-grade">
                    <xsl:value-of select="@grade"/>
                </div>
                <div class="employee-img">
                    <img class="img" src="{photo/@source}"/>
                </div>
                <div class="employee-name">
                    <span class="fullname">
                        <xsl:value-of select="firstName"/><xsl:text> </xsl:text><xsl:value-of select="lastName"/>
                    </span>
                </div>
                <div class="employee-age">
                    <span class="age">
                        <xsl:value-of select="dateOfBirth"/>
                    </span>
                </div>
                <div class="employee-salary">
                    <span class="salary">
                        <xsl:value-of select="salary"/>
                    </span>
                </div>
            </div>
        </xsl:for-each>
    </xsl:template>

</xsl:stylesheet>