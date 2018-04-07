window.onload (function(){
	// Buttons
	var CreateNewContactBtn = document.getElementById('CreateNewContact');
	var quickAddFormDiv = document.querySelector('.CreateNewContactForm')
	var cancelBtn = document.getElementById('Cancel');
	var AddBtn = document.getElementById('Add');
	// Form Fields
	var fullname = document.getElementById('fullname');
	var phone = document.getElementById('phone');
	var address = document.getElementById('address');
	var city = document.getElementById('city');
	var email = document.getElementById('email');
	// address book display
	var addBookDiv = document.querySelector('.addContact');

	CreateNewContactBtn.addEventListener("click", function(){
		// display the form div
		quickAddFormDiv.style.display = "block";
	});

	cancelBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "none";
	});

	AddBtn.addEventListener("click", addToBook);

    addBookDiv.addEventListener("click", removeEntry);
    

	// Storage Array
	var addressBook = [];

	//localStorage['addbook'] = '[{"fullname":"Sanusi babatunde","email":"swisskid95@gmail.com","phone":"08104036927","address":"something","city":"Lagos"}]';

	function jsonStructure(fullname,phone,address,city,email){
		this.fullname = fullname;
		this.phone = phone;
		this.address = address;
		this.city = city;
		this.email = email;
	}

	function addToBook(){
		var isNull = fullname.value!='' && phone.value!='' && address.value!='' && city.value!='' && email.value!='';
		if(isNull){
			// check if each field was field before saving to the array and local storage
			var obj = new jsonStructure(fullname.value,phone.value,address.value,city.value,email.value);
			addressBook.push(obj);
			localStorage['addContact'] = JSON.stringify(addressBook);
			quickAddFormDiv.style.display = "none";
			clearForm();
			displayAddressBook();
		}
    }

	function removeEntry(e){
		// Remove an entry from the addressbook
		if(e.target.classList.contains('delbutton')){
			var remID = e.target.getAttribute('data-id');
			addressBook.splice(remID,1);
			localStorage['addContact'] = JSON.stringify(addressBook);
			displayAddressBook();
			console.log('success');
		}
    }
    

	function clearForm(){
		var formFields = document.querySelectorAll('.formFields');
		for(var i in formFields){
			formFields[i].value = '';
		}
	}

    function displayAddressBook() {
        //check if the key 'addContact' exist in localStorage else create it
        //if it exists, load contents from the localStorage then loop > display it on the page.
		if(localStorage['addContact'] === undefined){
			localStorage['addContact'] = '';
		}
		else {
			addressBook = JSON.parse(localStorage['addContact']);
			// Loop over the array addressBook and insert into the page
			addBookDiv.innerHTML = '';
			for(var n in addressBook){
				var str = '<div class="entry">';
				    str += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
                    str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
                    str += '<div class="email"><p>' + addressBook[n].email + '</p></div>';
					str += '<div class="address"><p>' + addressBook[n].address + '</p></div>';
                    str += '<div class="city"><p>' + addressBook[n].city + '</p></div>';
					str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
					str += '</div>';
				addBookDiv.innerHTML += str;
			}
		}
	}

	displayAddressBook();

})