package view;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import model.webUser.*;
import dbUtils.*;

public class WebUserView {

    // Existing method to get all users
    public static StringDataList getAllUsers(DbConn dbc) {

        StringDataList sdl = new StringDataList();

        sdl.dbError = dbc.getErr();
        if (sdl.dbError.length() > 0) {
            return sdl;
        }

        StringData sd = new StringData();

        try {
            String sql = "SELECT web_user_id, user_email, user_password, user_image, membership_fee, birthday, "
                    + "web_user.user_role_id, user_role_type "
                    + "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id "
                    + "ORDER BY web_user_id ";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();

            while (results.next()) {

                sd = new StringData();

                sd.webUserId = Format.fmtInteger(results.getObject("web_user_id"));
                sd.userEmail = Format.fmtString(results.getObject("user_email"));
                sd.userPassword = Format.fmtString(results.getObject("user_password"));
                sd.userImage = Format.fmtString(results.getObject("user_image"));
                sd.birthday = Format.fmtDate(results.getObject("birthday"));
                sd.membershipFee = Format.fmtDollar(results.getObject("membership_fee"));
                sd.userRoleId = Format.fmtInteger(results.getObject("web_user.user_role_id"));
                sd.userRoleType = Format.fmtString(results.getObject("user_role_type"));
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

    // New method to find a user by email and password
    // Method in WebUserView.java

    public static StringData findByEmailAndPassword(DbConn dbc, String email, String password) {

        StringData sd = new StringData();

        // 1. Get the current database connection error (which exists in DbConn)
        String dbConnError = dbc.getErr();

        // 2. Check if a connection error occurred
        if (dbConnError.length() > 0) {
            // Since StringData doesn't have 'dbError', we use the existing 'errorMsg' field
            sd.errorMsg = "DB Connection Error: " + dbConnError;
            return sd;
        }
        // Note: The 'dbError' field is correctly used in the getAllUsers method
        // because it works with the StringDataList object (sdl).

        try {
            String sql = "SELECT web_user_id, user_email, user_password, user_image, membership_fee, birthday, "
                    + "web_user.user_role_id, user_role_type "
                    + "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id "
                    + "AND user_email = ? AND user_password = ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            stmt.setString(1, email);
            stmt.setString(2, password);

            ResultSet results = stmt.executeQuery();

            if (results.next()) {
                // User found, populate StringData fields
                sd.webUserId = Format.fmtInteger(results.getObject("web_user_id"));
                sd.userEmail = Format.fmtString(results.getObject("user_email"));
                sd.userPassword = Format.fmtString(results.getObject("user_password"));
                sd.userImage = Format.fmtString(results.getObject("user_image"));
                sd.birthday = Format.fmtDate(results.getObject("birthday"));
                sd.membershipFee = Format.fmtDollar(results.getObject("membership_fee"));
                sd.userRoleId = Format.fmtInteger(results.getObject("web_user.user_role_id"));
                sd.userRoleType = Format.fmtString(results.getObject("user_role_type"));
            } else {
                // User not found
                sd.errorMsg = "Error: Invalid email or password.";
            }

            results.close();
            stmt.close();

        } catch (Exception e) {
            // Handle any unexpected SQL or other exceptions
            sd.errorMsg = "Database access error: " + e.getMessage();
        }

        return sd;
    }
}