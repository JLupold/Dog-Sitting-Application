"use strict";

const ShowDogs = MakeShowData({
  url: "dog_info/getAll",
  title: "Dog List",
  keyProp: "dogID",
  columns: [
    { name: "_edit", label: "", type: "edit" },        
    { name: "dogID", label: "ID", type: "text" },
    { name: "imageURL", label: "Image", type: "image" },
    { name: "dogName", label: "Name", type: "text" },
    { name: "dogBreed", label: "Breed", type: "text" },
    { name: "medicalConcerns", label: "Medical", type: "text" },
    { name: "behavioralConcerns", label: "Behavioral", type: "text" },
    { name: "dateofDropoff", label: "Dropoff", type: "date" },
    { name: "userEmail", label: "Owner", type: "text" },
  ],
});