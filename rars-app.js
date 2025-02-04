let app = new Vue({
    el: '#app',
    data: {
        name: 'RARS',
        type: 'Instruments Co.',
        address: 'Flat 9C, Building 5, J-Sector, Malir Cantt. Karachi, Pakistan',
        logo_colored: 'assets/Rars-Logo-HD-Color.jpg',
        request_form: {
            name: '',
            company: '',
            location: '',
            email: '',
            phone: '',
            message: '',
        },
        pattens: {
            name: /^[a-zA-Z]+(\s[a-zA-Z]+)*$/,
            company: /^[a-zA-Z0-9]+(\s[a-zA-Z0-9]+)*$/,
            location: /^[a-zA-Z,\s]+(,?\s[a-zA-Z\s]+)?$/,
            email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~\-]+@[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9\-]+)*$/,
            phone: /^[0-9+\(\)-. ]+$/,
            message: /^[a-zA-Z0-9]+$/,
        }
    },
    mounted() {
        const button = document.getElementById('submit');
        if (button) {
            button.addEventListener('click', this.handleClick);
        }

        const phoneInputField = document.getElementById("phone");
        const phoneInput = window.intlTelInput(phoneInputField, {
            utilsScript:
            "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
            initialCountry: "ae" // Set UAE as the default country
        });
    },
    methods: {
        validate(x) {
            if(this.request_form[x]) {
                let regex = null;
                
                switch(x) {
                    case 'name':
                        regex = this.pattens.name;
                        break;
                    case 'company':
                        regex = this.pattens.company;
                        break;
                    case 'location':
                        regex = this.pattens.location;
                        break;
                    case 'email':
                        regex = this.pattens.email;
                        break;
                    case 'phone':
                        regex = this.pattens.phone;
                        break;
                    case 'message':
                        regex = this.pattens.message;
                        break;
                }
                

                // If the input value does not match the regex, it is invalid
                if(!regex.test(this.request_form[x])) {
                    document.getElementById(x).classList.add('invalid');
                } else {
                    document.getElementById(x).classList.remove('invalid');
                }
            }
        },
        handleClick() {
            if( this.request_form.name, this.request_form.company,
                this.request_form.location, this.request_form.email,
                this.request_form.phone
            ) {
                if (!this.request_form.message) {
                    this.request_form.message = "no message"
                }
                this.submit();
            }
        },
        submit() {
            const form = {...this.request_form};
            fetch('https://server-ngq5.onrender.com/collection/requests', {
                method: 'POST', // set the HTTP method as 'POST'
                headers: {
                    'Content-Type': 'application/json', // set the data type as JSON
                },
                body: JSON.stringify(form), // need to stringify the JSON object
            })
            .then(response => response.json())
            .then(responseJSON => {
                alert(JSON.stringify(responseJSON));
            })
            .catch((error) => {
                alert(error);
            });
        }
    }
});
