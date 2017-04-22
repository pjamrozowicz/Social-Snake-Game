package tai.project;

import javax.persistence.*;
import java.util.Map;

/**
 * Created by Przemek on 2017-04-22.
 */

@Entity
public class User {

    @Id
    private Long facebookId;
    private String firstName;
    private String lastName;
    private String gender;

    protected User(){}

    public User(Long facebookId, String firstName, String lastName, String gender){
        this.facebookId = facebookId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
    }

    @Override
    public String toString(){
        return String.format("Id: %d Name: %s %s Gender: %s", facebookId, firstName, lastName, gender);
    }

    public Long getFacebookId() {
        return facebookId;
    }

    public void setFacebookId(Long facebookId) {
        this.facebookId = facebookId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
