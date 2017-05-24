package tai.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Przemek on 2017-05-23.
 */

@Controller
@RequestMapping(value = "/score")
class ScoreController {

    @Autowired
    private UserRepository repository;

    private Facebook facebook;
    private ConnectionRepository connectionRepository;

    public ScoreController(Facebook facebook, ConnectionRepository connectionRepository) {
        this.facebook = facebook;
        this.connectionRepository = connectionRepository;
    }

    @RequestMapping(value = "/{score}", method = RequestMethod.POST )
    @ResponseStatus( HttpStatus.OK )
    @ResponseBody
    public Integer create(@PathVariable Integer score){
        Long userId = Long.parseLong(facebook.userOperations().getUserProfile().getId());
        User user = repository.findByFacebookId(userId).get(0);
        if(user.getBestScore()<score) {
            user.setBestScore(score);
            repository.save(user);
        }
        System.out.println(facebook.userOperations().getUserProfile().getName() +" got score: " + score);
        return score;
    }
}
