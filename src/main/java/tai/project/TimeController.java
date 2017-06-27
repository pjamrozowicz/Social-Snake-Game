package tai.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Lukas on 27.06.2017.
 */
@Controller
@RequestMapping(value = "/time")
public class TimeController {

    @Autowired
    private UserRepository repository;

    private Facebook facebook;
    private ConnectionRepository connectionRepository;

    public TimeController(Facebook facebook, ConnectionRepository connectionRepository) {
        this.facebook = facebook;
        this.connectionRepository = connectionRepository;
    }

    @RequestMapping(value = "/{time}", method = RequestMethod.POST )
    @ResponseStatus( HttpStatus.OK )
    @ResponseBody
    public Integer create(@PathVariable Integer time){
        Long userId = Long.parseLong(facebook.userOperations().getUserProfile().getId());
        User user = repository.findByFacebookId(userId).get(0);
        if(user.getBestTime()>time) {
            user.setBestTime(time);
            repository.save(user);
        }
        System.out.println(facebook.userOperations().getUserProfile().getName() +" set new time: " + time);
        return time;
    }
}
