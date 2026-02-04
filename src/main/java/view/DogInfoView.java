package view;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import model.dogInfo.*;
import dbUtils.*;

public class DogInfoView {

    public static StringDataList getAllDogInfo(DbConn dbc) {

        StringDataList sdl = new StringDataList();

        sdl.dbError = dbc.getErr();
        if (sdl.dbError.length() > 0) {
            return sdl;
        }

        StringData sd = new StringData();

        try {
            String sql = "SELECT dog_info.dog_id, dog_info.dog_tag, dog_info.dog_name, dog_info.dog_breed, dog_info.medical_concerns, dog_info.behavioral_concerns, dog_info.dateof_dropoff, dog_info.dateof_pickup, dog_info.image_url, dog_info.web_user_id, web_user.user_email " +
                    "FROM dog_info " +
                    "LEFT JOIN web_user " +
                    "ON web_user.web_user_id = dog_info.web_user_id " +
                    "ORDER BY dog_info.dog_id";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();

            while (results.next()) {

                sd = new StringData();

                sd.dogID = Format.fmtInteger(results.getObject("dog_id"));
                sd.dogTag = Format.fmtString(results.getObject("dog_tag"));
                sd.dogName = Format.fmtString(results.getObject("dog_name"));
                sd.dogBreed = Format.fmtString(results.getObject("dog_breed"));
                sd.medicalConcerns = Format.fmtString(results.getObject("medical_concerns"));
                sd.behavioralConcerns = Format.fmtString(results.getObject("behavioral_concerns"));
                sd.dateofDropoff = Format.fmtDate(results.getObject("dateof_dropoff"));
                sd.dateofPickup = Format.fmtDate(results.getObject("dateof_pickup"));
                sd.imageURL = Format.fmtString(results.getObject("image_url"));
                sd.webUserID = Format.fmtInteger(results.getObject("web_user_id"));
                sd.userEmail = Format.fmtString(results.getObject("user_email"));

                sdl.add(sd);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Database unavailable - please try later or contact your administrator. Error: "
                    + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}