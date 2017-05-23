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
    private int bestScore = 0;

    protected User(){}

    public User(Long facebookId, String firstName, String lastName, String gender){
        this.facebookId = facebookId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
    }

    @Override
    public String toString(){
        return String.format("Id: %d Name: %s %s Best score: %d", facebookId, firstName, lastName, bestScore);
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

    public int getBestScore() {
        return bestScore;
    }

    public void setBestScore(int bestScore) {
        this.bestScore = bestScore;
    }
}
