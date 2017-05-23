package tai.project;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Przemek on 2017-05-23.
 */

@Controller
@RequestMapping(value = "/score")
class ScoreController {

    @RequestMapping(value = "/{score}", method = RequestMethod.POST )
    @ResponseStatus( HttpStatus.OK )
    @ResponseBody
    public Integer create(@PathVariable Integer score){
        System.out.println("I got score: " + score);
        return score;
    }
}
