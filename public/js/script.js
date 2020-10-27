console.log("index.js sanity!");

///////////Vue instance/////////////
new Vue({
    el: "#main",
    //this is our data object, which vue will render
    data: {
        images: [], //we leave it an empty array
        //data properties that will store values to Vue logic
        title: "", //placeholder
        description: "",
        username: "",
        file: null,
    },
    // all created functions are defined here
    methods: {
        handleClick: function (e) {
            e.preventDefault();
            // console.log("this: ", this);

            let formData = new FormData(); //we need this to send a *file*
            formData.append("title", this.title);
            formData.append("description", this.description);
            formData.append("username", this.username);
            formData.append("file", this.file);
            //
            axios
                .post("/upload", formData)
                .then(function (response) {
                    console.log("response from POST /upload", response);
                })
                .catch(function (err) {
                    console.log("error in axios POST /upload", err);
                });
        },
        handleChange: function (e) {
            // console.log("handleChange is running!");
            // console.log("file: ", e.target.files[0]);
            this.file = e.target.files[0]; //grabbing the file from the choose file button
        },
    },
    mounted: function () {
        var me = this; //helps to pass the global "this"  (main data in vue) down to the function below
        axios
            .get("/images")
            .then(function (response) {
                console.log("axios GET response", response);
                me.images = response.data;
            })
            .catch(function (err) {
                console.log("error in axios GET /images", err);
            });
    },
});

//image url
// https://pimento-imageboard.s3.amazonaws.com/CfbyDcJWKbT6cQfZTu8jE1szMiEz1sXb.jpg
