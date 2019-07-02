var sites = [],
    msg;

window.addEventListener("load", function () {
    clearForm();
    phoneBooks = JSON.parse(localStorage.getItem("phonebooks"));
    if(phoneBooks !== null){
        displayData(phoneBooks);
    }else{
        phoneBooks = [];
    }
});

function addNew() {
    var name = document.getElementById("name").value,
        phone = parseInt(document.getElementById("phone").value),
        email = document.getElementById("email").value.toLowerCase(),
        alert = document.querySelector(".phone-book #alert");

    // Input Validation
    if (name == "") {
        msg = "Please Insert The Name";
        alertMsg(msg,alert);
    }else if (isNaN(phone) || ("" + phone).length != 10) {
        msg = "Please Insert A Valid Phone Number Should Be 11 Digits";
        alertMsg(msg,alert);
    }else if (email == "" || email.indexOf(" ") >= 0 || email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        msg = "Please Insert A Valid Email";
        alertMsg(msg,alert);
    }else {
        var checked = checkIfStored(email);
        if (checked == "false") {
            msg = "This Contact Already Exist";
            alertMsg(msg,alert);
        }else {
            phone = "0" + phone;
            add(alert,name,phone,email);
        }
    }  
};

// Add Bookmark to table
function add(alert,name,phone,email) {
    alert.style.display = "none";
    var phoneBook = {name : name, phone : phone, email : email};
    phoneBooks.push(phoneBook);
    localStorage.setItem("phonebooks",JSON.stringify(phoneBooks));
    displayData(phoneBooks);
    clearForm();
}

// Display Bookmarked Sites in a table
function displayData(contacts) {
    var tbody = document.getElementById("contacts-table"),
        trs = "";
    for (var i = 0; i < contacts.length; i++) {
        var email = "`" + contacts[i].email + "`";
        trs += "<tr><td>" + (i + 1) + "</td><td>" + contacts[i].name + "</td><td>" + contacts[i].phone + "</td><td>" + contacts[i].email + "</td><td><a class='btn btn-danger text-white btn-sm' href='#' onclick='deleteContact(" + email + ")'>Delete</a></td></tr>";
    }
    tbody.innerHTML = trs;
}

// Delete a Bookmark
function deleteContact(email) {
    for (var i = 0; i < phoneBooks.length; i++) {
        if (phoneBooks[i].email === email) {
            phoneBooks.splice(i,1);
        };
    };
    localStorage.setItem("phonebooks",JSON.stringify(phoneBooks));
    displayData(phoneBooks);
}
// Clear Inputs Fields After Adding
function clearForm() {
    var inputs = document.getElementsByTagName("input");
    for (var i=0; i < inputs.length; i++) {
      inputs[i].value = ""
    }
}
// Check If The Url Is Stored Before Or Not
function checkIfStored (email) {
    for (var i = 0; i < phoneBooks.length; i++) {
        if (phoneBooks[i].email == email) {
            return "false";
        }
    }
}
// To Show An Alert Msg For Wrong Inputs
function alertMsg (msg,alert) {
    alert.style.display = "block";
    alert.innerText = msg;
}

// Search For Exciting Contact
function search() {
    var searchFor = document.querySelector(".search #search"),
        alert = document.querySelector(".table #alert"),
        searchResults = [];
    for (var i = 0; i < phoneBooks.length; i++) {
        if (phoneBooks[i].phone.indexOf(searchFor.value) >= 0 || phoneBooks[i].email.indexOf(searchFor.value) >= 0) {
            searchResults.push(phoneBooks[i]);
            alert.style.display = "none";
        }else if (searchResults == "") {
            msg = "No Match Found";
            alertMsg(msg,alert);
        }
    };
    localStorage.setItem("searchresults",JSON.stringify(searchResults));
    displayData(searchResults);
}

// Sort The Contacts Alphabetically
function sortContacts(contactsToSort) {
    contactsToSort.sort(function(a, b){
        var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
        if (nameA < nameB) //sort string ascending
            return -1;
        if (nameA > nameB)
            return 1;
        return 0; //default return value (no sorting)
    });
    return contactsToSort;
    
}

function shownContacts () {
    var contactsNumber = parseInt(document.getElementById("contacts-number").value);
    var sortedPhoneBooks = sortContacts(phoneBooks);
    if (isNaN(contactsNumber)) {
        alert = document.querySelector(".alert-msg #alert");
        msg = "Please Insert A Valid Number";
        alertMsg(msg,alert);
    }else {
        alert.style.display = "none";
        if (contactsNumber >= sortedPhoneBooks.length) {
            displayData(sortedPhoneBooks);
        }else {
            var shownPhoneBooks = [];
            for (var i = 0; i < contactsNumber; i++) {
                shownPhoneBooks[i] = sortedPhoneBooks[i];
            }
            displayData(shownPhoneBooks);
        }
    }
}

function resetContacts() {
    displayData(phoneBooks);
}

