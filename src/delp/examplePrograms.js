// This file contain the DeLP programs used as examples for the platform
export const examplePrograms = {
    "0": "use_criterion(more_specific).\n\n" +
        "fly(X) -< bird(X).\n" +
        "bird(X) <- chicken(X).\n" +
        "bird(X) <- penguin(X).\n" +
        "bird(X) <- duck(X).\n" +
        "bird(X) <- rhea(X).\n" +
        "~fly(X) <- penguin(X).\n" +
        "~fly(X) -< chicken(X).\n" +
        "~fly(X) -< baby(X).\n" +
        "fly(X) -< chicken(X), scared(X).\n\n" +

        "chicken(little).\n" +
        "chicken(koko).\n" +
        "scared(koko).\n" +
        "chicken(lily).\n" +
        "scared(lily).\n" +
        "penguin(chilly).\n" +
        "duck(tiny).\n" +
        "baby(tiny).\n" +
        "rhea(charito).",

    "1": "use_criterion(more_specific).\n\n" +
        "a-<b.\n" +
        "~a-<b,c.\n" +
        "a-<d,b,c.\n" +
        "h -< b.\n" +
        "~h -< d,b.\n\n" +

        "b.\n" +
        "c.\n" +
        "d.",

    "2": "use_criterion(more_specific).\n\n" +
        "surf -< nice, spare_time.\n" +
        "nice -< waves.\n" +
        "~nice -< rain.\n" +
        "rain -< cloudy.\n" +
        "~rain -< dry_season.\n" +
        "spare_time -< ~busy.\n" +
        "~busy -< ~working.\n" +
        "cold -< winter.\n" +
        "working -< monday.\n" +
        "busy -< yard_work.\n" +
        "yard_work -< grass_grown.\n" +
        "~yard_work -< hire_gardener.\n" +
        "many_surfers -< waves.\n" +
        "~many_surfers -< monday.\n\n" +

        "monday.\n" +
        "cloudy.\n" +
        "dry_season.\n" +
        "waves.\n" +
        "grass_grown.\n" +
        "hire_gardener.\n" +
        "vacation.\n" +
        "~working <- vacation.\n" +
        "few_surfers <- ~many_surfers.\n" +
        "~surf <- ill.",

    "3": "use_criterion(more_specific).\n\n" +
        "r -< s.\n" +
        "~h -< d,t.\n" +
        "s -< d.\n" +
        "~e -< ~h, ~a.\n" +
        "s -< h.\n" +
        "~i -< ~a, s.\n" +
        "h -< d.\n" +
        "h -< b.\n" +
        "a -< t.\n" +
        "~f -< ~e.\n\n" +

        "~a.\n" +
        "t.\n" +
        "b.\n" +
        "d <- t.",

    "4": "has_priority((a-<d,b,c),(~a-<b,c)).\n" +
        "has_priority((~a-<b,c),(a-<b)).\n\n" +

        "use_criterion(rules_priorities).\n\n" +

        "a-<b.\n" +
        "~a-<b,c.\n" +
        "a-<d,b,c.\n" +
        "h -< b.\n" +
        "~h -< d,b.\n\n" +

        "b.\n" +
        "c.\n" +
        "d.",

    "5": "use_criterion(more_specific).\n\n" +
        "a -< x.\n" +
        "a -< y.\n" +
        "~a -< x,y.\n" +
        "~a -< z.\n" +
        "a -< x,y,z.\n" +
        "~a -< w,z.\n" +
        "a -< w.\n\n" +

        "x.\n" +
        "y.\n" +
        "z.\n" +
        "w.",

    "6": "use_criterion(more_specific).\n" +

        "a-<b.\n\n" +

        "~a-<b,c.\n" +
        "~a-<b,d.\n" +
        "~a-<b,e.\n\n" +

        "a-<b,z,c.\n" +
        "a-<b,z,d.\n" +
        "a-<b,z,e.\n\n" +

        "a-<b,c,d,e.\n\n" +

        "b.\n" +
        "c.\n" +
        "d.\n" +
        "e.\n" +
        "z."

    /* "7": "use_criterion(more_specific).\n\n" +

        "~culpable(X) -< not culpable(X).\n" +
        "~preso(X) <- inocente(X).\n" +
        "inocente(X) <- ~culpable(X).\n" +
        "preso(X) -< not culpable(X), alta-sospecha(X).\n" +
        "alta-sospecha(pepe) ." */

}
