console.log("Integrated!");


const base_url = "https://usman-cui-recipies.herokuapp.com/api/products";

$(function() {
    console.log("Initial function!");
    loadProduct();
    //$("#to_populate").on("click", ".btn-danger", handleDelete);
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
    $.ajax({
      url: base_url,
      method: "POST",
      data: { title, body },
      success: function(response) {
        console.log(response);
        $("#title").val("");
        $("#body").val("");
        loadRecipies();
        $("#exampleModal").modal("hide");
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
            <h5>Name:</h5>${rec.name}
            <h5>Price:</h5>${rec.price}
            <h5>Color:</h5>${rec.color}
            <h5>Department:</h5>${rec.department}
            <h5>Description:</h5>${rec.description}
            <p>
            <button class="btn btn-danger btn-sm float-right">delete</button>
            <button class="btn btn-warning btn-sm float-right">Edit</button> ${rec.body}
            </p>
            </div>`
          );
          // recipes.append("<div><h3>" + rec.title + "</h3></div>");
        }
      }
    });
  }