package model.dogInfo;

public class StringData {

    public String dogID = "";     
    public String dogTag = "";
    public String dogName = "";
    public String dogBreed = "";
    public String medicalConcerns = "";
    public String behavioralConcerns = "";
    public String dateofDropoff = "";
    public String dateofPickup = "";
    public String imageURL = "";
    public String webUserID = "";
    public String userEmail = "";

    public String errorMsg = ""; 

    // Default constructor
    public StringData() { }

    public int characterCount() {
        String s = this.dogTag 
                 + this.dogName 
                 + this.dogBreed 
                 + this.medicalConcerns
                 + this.behavioralConcerns 
                 + this.dateofDropoff 
                 + this.dateofPickup
                 + this.imageURL 
                 + this.webUserID 
                 + this.userEmail;
        return s.length();
    }
}