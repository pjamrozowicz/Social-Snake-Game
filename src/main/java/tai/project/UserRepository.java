package tai.project;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * Created by Przemek on 2017-04-22.
 */

public interface UserRepository extends JpaRepository<User,Long>{
    List<User> findByLastName(String lastName);
    List<User> findByFirstName(String firstName);
    List<User> findByFacebookId(Long facebookId);

    //used to top score
    List<User> findTop10ByOrderByBestScoreDesc();

    //get all users
    List<User>  findAll();
}
