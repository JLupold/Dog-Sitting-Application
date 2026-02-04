package com.sample;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.RequestParam;

import model.dogInfo.DbMods;
import model.dogInfo.StringData;
import model.dogInfo.StringDataList;
import dbUtils.*;
import view.DogInfoView;

@RestController
public class DogInfoController {

    @RequestMapping(value = "/dog_info/getAll", produces = "application/json")
    public String allDogs() {
        StringDataList list = new StringDataList();
        DbConn dbc = new DbConn();
        list = DogInfoView.getAllDogInfo(dbc);
        dbc.close();
        return Json.toJson(list);
    }

    @RequestMapping(value = "/dog_info/insert", params = { "jsonData" }, produces = "application/json")
    public String insert(@RequestParam("jsonData") String jsonInsertData) {

        StringData errorMsgs = new StringData();

        if ((jsonInsertData == null) || jsonInsertData.length() == 0) {
            errorMsgs.errorMsg = "Cannot insert. No dog data was provided in JSON format";
        } else {
            System.out.println("dog data for insert (JSON): " + jsonInsertData);
            try {
                ObjectMapper mapper = new ObjectMapper();
                StringData insertData = mapper.readValue(jsonInsertData, StringData.class);
                System.out.println("dog data for insert (java obj): " + insertData.toString());

                DbConn dbc = new DbConn();
                errorMsgs.errorMsg = dbc.getErr();
                if (errorMsgs.errorMsg.length() == 0) { // db connection OK
                    errorMsgs = DbMods.insert(insertData, dbc);
                }
                dbc.close();
            } catch (Exception e) {
                String msg = "Could not convert jsonData to model.dogInfo.StringData obj: " +
                        jsonInsertData + " - or other error in controller for 'dogInfo/insert': " +
                        e.getMessage();
                System.out.println(msg);
                errorMsgs.errorMsg += ". " + msg;
            }
        }
        return Json.toJson(errorMsgs);
    }

    @RequestMapping(value = "/dog_info/getById", params = { "dogID" }, produces = "application/json")
    public String getById(@RequestParam("dogID") String dogId) {
        StringData sd = new StringData();

        if (dogId == null) {
            sd.errorMsg = "Error: URL must be dog_info/getById/xx "
                    + "where xx is the dog_id of the desired dog_info record.";
        } else {
            DbConn dbc = new DbConn();
            sd.errorMsg = dbc.getErr();

            if (sd.errorMsg.length() == 0) {
                System.out.println("*** Ready to call DbMods.getById (dog_info)");
                sd = DbMods.getById(dbc, dogId);
            }

            dbc.close(); // prevent DB connection leak
        }

        return Json.toJson(sd);
    }

    @RequestMapping(value = "/dog_info/update", params = { "jsonData" }, produces = "application/json")
    public String update(@RequestParam("jsonData") String jsonInsertData) {

        StringData errorData = new StringData();

        if ((jsonInsertData == null) || jsonInsertData.length() == 0) {
            errorData.errorMsg = "Cannot update. No dog data was provided in JSON format";
        } else {
            System.out.println("dog data for update (JSON): " + jsonInsertData);

            try {
                ObjectMapper mapper = new ObjectMapper();
                StringData updateData = mapper.readValue(jsonInsertData, StringData.class);
                System.out.println("dog data for update (java obj): " + updateData.toString());

                DbConn dbc = new DbConn();
                errorData = DbMods.update(updateData, dbc);
                dbc.close();

            } catch (Exception e) {
                String msg = "Unexpected error in controller for 'dog_info/update'... "
                        + e.getMessage();
                System.out.println(msg);
                errorData.errorMsg = msg;
            }
        }
        return Json.toJson(errorData);
    }

    @RequestMapping(value = "/dog_info/delete", params = { "dogId" }, produces = "application/json")
    public String delete(@RequestParam("dogId") String dogId) {
        
        StringData sd = new StringData();

        if (dogId == null || dogId.isEmpty()) {
            sd.errorMsg = "Error: URL must be dog_info/delete?dogId=xx, where xx is the dog_id of the dog_info record to delete.";
        } else {
            DbConn dbc = new DbConn();
            try {
                sd = DbMods.delete(dbc, dogId);
            } catch (Exception e) {
                sd.errorMsg = "Exception thrown in DogInfoController.delete(): " + e.getMessage();
            } finally {
                dbc.close();
            }
        }

        return Json.toJson(sd);
    }

}