console.log("Integrated!");


const base_url = "https://usman-cui-recipies.herokuapp.com/api/products/";

$(function() {
    console.log("Initial function!");
    loadProduct();
    $("#to_populate").on("click", ".btn-outline-danger", deleteProduct);
    //$("#to_populate").on("click", ".btn-warning", handleUpdate);
    $("#addBtn").click(addProduct);
    $("#updateSave").click(function() {
      var id = $("#updateId").val();
      var title = $("#updateTitle").val();
      var body = $("#updateBody").val();
      $.ajax({
        url:  base_url + id,
        data: { title, body },
        method: "PUT",
        success: function(response) {
          console.log(response);
          loadProduct(); 
          $("#updateModal").modal("hide");
          //
        }
      });
    });
  });

//ADD Data to Server
function addProduct() {
    var title = $("#title").val();
    var body = $("#body").val();
    console.log("ADDPROD");
    console.log(body);
    $.ajax({
      url: base_url,
      method: "POST",
      data: { title, body },
      success: function(response) {
        console.log(response);
        $("#title").val("");
        $("#body").val("");
        loadProduct();
        $("#exampleModal").modal("hide");
      }
    });
  }

//DELETE i from Server
function deleteProduct() {
    var btn = $(this);
    var parentDiv = btn.closest(".to_populate");
    let id = parentDiv.attr("data-id");
    console.log("Product id:" + id);
    console.log(id);
    $.ajax({
      url: base_url + id,
      method: "DELETE",
      success: function() {
        //on success load the products again
        loadProduct();
      }
    });
  }

//GET DATA from server
function loadProduct() {
    console.log("loadProduct()");
    $.ajax({
      url: base_url,
      method: "GET",
      error: function(response) {
        var products = $("#to_populate");
        to_populate.html("An Error has occured");
      },
      success: function(response) {
        console.log(response);
        console.log("response loaded..");
        var to_populate = $("#to_populate");
        to_populate.empty();
        for (var i = 0; i < response.length; i++) {
          var rec = response[i];
          to_populate.append(
            `<div class="to_populate" data-id="${rec._id}">

                <p style="float:right">
                <button class="btn btn-outline-warning btn-sm float-right">Edit</button> 
                <button class="btn btn-outline-danger btn-sm float-right">Delete</button>
                </p>
                <h5>Name:</h5>${rec.name}
                <h5>Price:</h5>${rec.price}
                <h5>Color:</h5>${rec.color}
                <h5>Department:</h5>${rec.department}
                <h5>Description:</h5>${rec.description}
                
            </div>`
          );
          // recipes.append("<div><h3>" + rec.title + "</h3></div>");
        }
      }
    });
  }