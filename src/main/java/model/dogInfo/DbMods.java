package model.dogInfo;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import dbUtils.*;

public class DbMods {

    private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

        /*
         * Reference for field names:
         * public String dogID = "";
         * public String dogTag= "";
         * public String dogName= "";
         * public String dogBreed= "";
         * public String medicalConcerns= "";
         * public String behavioralConcerns= "";
         * public String dateofDropoff= "";
         * public String dateofPickup= "";
         * public String imageURL= "";
         * public String webUserID = "";
         * public String userEmail = "";
         */

        errorMsgs.dogTag = Validate.stringMsg(inputData.dogTag, 45, false);
        errorMsgs.dogName = Validate.stringMsg(inputData.dogName, 45, true);
        errorMsgs.dogBreed = Validate.stringMsg(inputData.dogBreed, 45, true);
        errorMsgs.medicalConcerns = Validate.stringMsg(inputData.medicalConcerns, 300, false);
        errorMsgs.behavioralConcerns = Validate.stringMsg(inputData.behavioralConcerns, 300, false);
        errorMsgs.dateofDropoff = Validate.dateMsg(inputData.dateofDropoff, false);
        errorMsgs.dateofPickup = Validate.dateMsg(inputData.dateofPickup, false);
        errorMsgs.imageURL = Validate.stringMsg(inputData.imageURL, 300, false);
        errorMsgs.webUserID = Validate.integerMsg(inputData.webUserID, true);

        return errorMsgs;
    }

    public static StringData insert(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);

        if (errorMsgs.characterCount() > 0) {
            errorMsgs.errorMsg = "Please correct the highlighted errors.";
            return errorMsgs;
        } else {

            String sql = "INSERT INTO dog_info (dog_tag, dog_name, dog_breed, medical_concerns, behavioral_concerns, "
                    + "dateof_dropoff, dateof_pickup, image_url, web_user_id) "
                    + "VALUES (?,?,?,?,?,?,?,?,?)";

            PrepStatement pStatement = new PrepStatement(dbc, sql);

            pStatement.setString(1, inputData.dogTag);
            pStatement.setString(2, inputData.dogName);
            pStatement.setString(3, inputData.dogBreed);
            pStatement.setString(4, inputData.medicalConcerns);
            pStatement.setString(5, inputData.behavioralConcerns);
            pStatement.setDate(6, Validate.convertDate(inputData.dateofDropoff));
            pStatement.setDate(7, Validate.convertDate(inputData.dateofPickup));
            pStatement.setString(8, inputData.imageURL);
            pStatement.setInt(9, Validate.convertInteger(inputData.webUserID));

            int numRows = pStatement.executeUpdate();

            errorMsgs.errorMsg = pStatement.getErrorMsg();

            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // success
                } else {
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Web User ID - " + errorMsgs.errorMsg;
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That dog tag or name is already taken - " + errorMsgs.errorMsg;
            } else if (errorMsgs.errorMsg.contains("Column 'dateof_dropoff' cannot be null") ||
                    errorMsgs.errorMsg.contains("Column 'dateof_pickup' cannot be null")) {
                errorMsgs.errorMsg = "Please enter both dropoff and pickup dates.";
            }

        }
        return errorMsgs;
    }

    public static StringData getById(DbConn dbc, String id) {
        StringData sd = new StringData();

        if (id == null) {
            sd.errorMsg = "Cannot getById (dog): id is null";
            return sd;
        }

        Integer intId;
        try {
            intId = Integer.valueOf(id);
        } catch (Exception e) {
            sd.errorMsg = "Cannot getById (dog): URL parameter 'id' cannot be converted to an Integer.";
            return sd;
        }

        try {
            String sql = "SELECT dog_id, dog_tag, dog_name, dog_breed, medical_concerns, "
                    + "behavioral_concerns, dateof_dropoff, dateof_pickup, image_url, "
                    + "dog_info.web_user_id, web_user.user_email "
                    + "FROM dog_info, web_user "
                    + "WHERE dog_info.web_user_id = web_user.web_user_id "
                    + "AND dog_id = ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            stmt.setInt(1, intId);

            ResultSet results = stmt.executeQuery();

            if (results.next()) {
                sd.dogID = Format.fmtInteger(results.getObject("dog_id"));
                sd.dogTag = Format.fmtString(results.getObject("dog_tag"));
                sd.dogName = Format.fmtString(results.getObject("dog_name"));
                sd.dogBreed = Format.fmtString(results.getObject("dog_breed"));
                sd.medicalConcerns = Format.fmtString(results.getObject("medical_concerns"));
                sd.behavioralConcerns = Format.fmtString(results.getObject("behavioral_concerns"));
                sd.dateofDropoff = Format.fmtDate(results.getObject("dateof_dropoff"));
                sd.dateofPickup = Format.fmtDate(results.getObject("dateof_pickup"));
                sd.imageURL = Format.fmtString(results.getObject("image_url"));
                sd.webUserID = Format.fmtInteger(results.getObject("dog_info.web_user_id"));
                sd.userEmail = Format.fmtString(results.getObject("user_email"));
            } else {
                sd.errorMsg = "Dog Record Not Found.";
            }

            results.close();
            stmt.close();

        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in model.dogInfo.DbMods.getById(): " + e.getMessage();
        }

        return sd;
    }// getById

    public static StringData update(StringData updateData, DbConn dbc) {

        StringData errorMsgs = new StringData();

        errorMsgs = validate(updateData);

        errorMsgs.dogID = Validate.integerMsg(updateData.dogID, true);

        if (errorMsgs.characterCount() > 0) {
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else {

            String sql = "UPDATE dog_info SET dog_tag = ?, dog_name = ?, dog_breed = ?, "
                    + "medical_concerns = ?, behavioral_concerns = ?, dateof_dropoff = ?, "
                    + "dateof_pickup = ?, image_url = ?, web_user_id = ? "
                    + "WHERE dog_id = ?";

            PrepStatement pStatement = new PrepStatement(dbc, sql);

            pStatement.setString(1, updateData.dogTag);
            pStatement.setString(2, updateData.dogName);
            pStatement.setString(3, updateData.dogBreed);
            pStatement.setString(4, updateData.medicalConcerns);
            pStatement.setString(5, updateData.behavioralConcerns);
            pStatement.setDate(6, Validate.convertDate(updateData.dateofDropoff));
            pStatement.setDate(7, Validate.convertDate(updateData.dateofPickup));
            pStatement.setString(8, updateData.imageURL);
            pStatement.setInt(9, Validate.convertInteger(updateData.webUserID));

            pStatement.setInt(10, Validate.convertInteger(updateData.dogID));

            int numRows = pStatement.executeUpdate();

            errorMsgs.errorMsg = pStatement.getErrorMsg();

            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // success
                } else {
                    errorMsgs.errorMsg = numRows + " records were updated when exactly 1 was expected.";
                }
            }
        }

        return errorMsgs;
    }// update

    public static StringData delete(DbConn dbc, String dogId) {

        StringData sd = new StringData();

        // Validate ID
        Integer intId = null;
        try {
            intId = Integer.valueOf(dogId);
        } catch (Exception e) {
            sd.errorMsg = "Cannot delete dog record: invalid dog ID.";
            return sd;
        }

        try {

            String sql = "DELETE FROM dog_info WHERE dog_id = ?";

            PrepStatement pStatement = new PrepStatement(dbc, sql);
            pStatement.setInt(1, intId);

            int numRows = pStatement.executeUpdate();

            sd.errorMsg = pStatement.getErrorMsg();

            if (sd.errorMsg.length() == 0) {

                if (numRows == 1) {
                    sd.errorMsg = "";
                } else {
                    sd.errorMsg = numRows + " records were deleted when exactly 1 was expected.";
                }

            } else if (sd.errorMsg.contains("foreign key")) {

                sd.errorMsg = "Cannot delete this dog. It is referenced by another record.";

            }

        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in model.dogInfo.DbMods.delete(): "
                    + e.getMessage();
        }

        return sd;
    }

}