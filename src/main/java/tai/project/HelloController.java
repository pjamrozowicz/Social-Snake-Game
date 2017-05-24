package tai.project;

/**
 * Created by Lukas on 22.05.2017.
 */

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.facebook.api.*;
import org.springframework.social.facebook.api.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/")
public class HelloController {

    @Autowired
    private UserRepository repository;

    private Facebook facebook;
    private ConnectionRepository connectionRepository;

    public HelloController(Facebook facebook, ConnectionRepository connectionRepository) {
        this.facebook = facebook;
        this.connectionRepository = connectionRepository;
    }



    @GetMapping
    public String helloFacebook(Model model) {
        if (connectionRepository.findPrimaryConnection(Facebook.class) == null) {
            return "redirect:/connect/facebook";
        }

        User user = facebook.userOperations().getUserProfile();
        putUserToDatabase(user);
        model.addAttribute("facebookProfile", user);
        List<tai.project.User> topList = repository.findTop10ByOrderByBestScoreDesc();
        model.addAttribute("topList",topList);


        System.out.println("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMM");
        System.out.println(topList);
        return "hello";
    }



    @GetMapping(value = {"/index"})
    public String gameView() {
        if (connectionRepository.findPrimaryConnection(Facebook.class) == null) {
            return "redirect:/connect/facebook";
        }
        return "index";
    }

    private void putUserToDatabase(User user){
        Long id = Long.parseLong(user.getId());
         if(repository.findByFacebookId(id).isEmpty()){

            repository.save(new tai.project.User(id,
                    user.getFirstName(),
                    user.getLastName(),
                    user.getGender()));
        }
    }



}