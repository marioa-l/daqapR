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
        "z.",
        
    "7": "use_criterion(more_specific).\n" +
        
        "a_2 -< true.\n" +
        "a_3 -< true.\n" +
        "a_4 -< true.\n" +
        "d_9 -< true.\n" +
        "d_10 -< true.\n" +
        "~d_11 -< true.\n" +
        "~d_12 -< true.\n" +
        "~d_13 -< true.\n" +
        "d_14 -< true.\n" +
        "d_15 -< true.\n" +
        "~d_16 -< true.\n" +
        "~d_17 -< true.\n" +
        "~a_0.\n" +
        "a_1.\n" +
        
        "a_6 -< a_4.\n" +
        "~a_5 <- a_3.\n" +
        
        "a_8 -< a_6.\n" +
        "~a_7 -< a_6.\n" +
        
        "~a_8 -< d_9,a_6.\n" +
        "~a_8 -< a_4,d_10.\n" +
        "a_8 -< d_9,~d_11,a_6.\n" +
        "a_8 -< ~d_12,a_4,d_10.\n" +
        "a_7 -< a_4,~d_13.\n" +
        "a_7 -< d_14,a_6.\n" +
        "~a_7 -< a_4,~d_13,d_15.\n" +
        "~a_7 -< a_4,~d_13,~d_16.\n" +
        "~a_7 -< ~d_17,d_14,a_6.",
        
    "8": "use_criterion(more_specific).\n" +
        
        "a_0 -< true.\n" +
        "a_1 -< true.\n" +
        "a_3 -< true.\n" +
        "a_4 -< true.\n" +
        "a_5 -< true.\n" +
        "a_7 -< true.\n" +
        "a_8 -< true.\n" +
        "~a_9 -< true.\n" +
        "d_18 -< true.\n" +
        "d_19 -< true.\n" +
        "d_20 -< true.\n" +
        "d_21 -< true.\n" +
        "d_22 -< true.\n" +
        "~d_23 -< true.\n" +
        "d_24 -< true.\n" +
        "~d_25 -< true.\n" +
        "~d_26 -< true.\n" +
        "~d_27 -< true.\n" +
        "d_28 -< true.\n" +
        "~d_29 -< true.\n" +
        "~d_30 -< true.\n" +
        "~d_31 -< true.\n" +
        "~d_32 -< true.\n" +
        "d_33 -< true.\n" +
        "d_34 -< true.\n" +
        "d_35 -< true.\n" +
        "~d_36 -< true.\n" +
        "d_37 -< true.\n" +
        "d_38 -< true.\n" +
        "d_39 -< true.\n" +
        "~d_40 -< true.\n" +
        "~d_41 -< true.\n" +
        "~d_42 -< true.\n" +
        "d_43 -< true.\n" +
        "~d_44 -< true.\n" +
        "~d_45 -< true.\n" +
        "d_46 -< true.\n" +
        "d_47 -< true.\n" +
        "d_48 -< true.\n" +
        "d_49 -< true.\n" +
        "d_50 -< true.\n" +
        "d_51 -< true.\n" +
        "~d_52 -< true.\n" +
        "~d_53 -< true.\n" +
        "~d_54 -< true.\n" +
        "~d_55 -< true.\n" +
        "d_56 -< true.\n" +
        "d_57 -< true.\n" +
        "d_58 -< true.\n" +
        "d_59 -< true.\n" +
        "d_60 -< true.\n" +
        "~d_61 -< true.\n" +
        "d_62 -< true.\n" +
        "d_63 -< true.\n" +
        "~d_64 -< true.\n" +
        "~d_65 -< true.\n" +
        "a_2.\n" +
        "~a_6.\n" +
        
        "~a_12 -< a_7.\n" +
        "a_13 -< a_8.\n" +
        "a_11 <- a_2,a_5.\n" +
        "~a_10 <- a_5,a_7.\n" +
        
        "a_14 -< a_13,a_0.\n" +
        "a_15 -< a_13,~a_9.\n" +
        "a_17 -< a_13,a_7.\n" +
        "a_16 -< ~a_12.\n" +
        
        "~a_14 -< a_13,d_18,a_0.\n" +
        "~a_14 -< a_13,d_19,a_0.\n" +
        "~a_14 -< a_13,d_20,a_0.\n" +
        "~a_14 -< a_13,d_21,a_0.\n" +
        "a_14 -< a_13,d_22,d_18,a_0.\n" +
        "a_14 -< a_13,d_18,a_0,~d_23.\n" +
        "a_14 -< a_13,d_24,d_19,a_0.\n" +
        "a_14 -< a_13,~d_25,d_19,a_0.\n" +
        "a_14 -< a_13,d_20,~d_26,a_0.\n" +
        "a_14 -< a_13,d_20,~d_27,a_0.\n" +
        "a_14 -< a_13,d_21,d_28,a_0.\n" +
        "a_14 -< a_13,d_21,a_0,~d_29.\n" +
        "~a_15 -< ~d_30,a_8.\n" +
        "~a_15 -< a_13,~a_9,~d_31.\n" +
        "~a_15 -< a_13,~a_9,~d_32.\n" +
        "~a_15 -< d_33,a_8.\n" +
        "a_15 -< d_34,~d_30,a_8.\n" +
        "a_15 -< ~d_30,a_8,d_35.\n" +
        "a_15 -< ~d_30,~d_36,a_8.\n" +
        "a_15 -< a_13,~a_9,d_37,~d_31.\n" +
        "a_15 -< a_13,~a_9,d_38,~d_32.\n" +
        "a_15 -< d_33,a_8,d_39.\n" +
        "~a_17 -< a_13,a_7,~d_40.\n" +
        "~a_17 -< ~d_41,a_8.\n" +
        "~a_17 -< ~d_42,a_8.\n" +
        "~a_17 -< d_43,a_8.\n" +
        "a_17 -< a_13,a_7,~d_44,~d_40.\n" +
        "a_17 -< a_13,a_7,~d_45,~d_40.\n" +
        "a_17 -< ~d_41,a_8,d_46.\n" +
        "a_17 -< ~d_41,a_8,d_47.\n" +
        "a_17 -< ~d_42,d_48,a_8.\n" +
        "a_17 -< ~d_42,d_49,a_8.\n" +
        "a_17 -< d_43,d_50,a_8.\n" +
        "a_17 -< d_43,d_51,a_8.\n" +
        "~a_16 -< ~a_12,~d_52.\n" +
        "~a_16 -< ~a_12,~d_53.\n" +
        "~a_16 -< a_7,~d_54.\n" +
        "~a_16 -< a_7,~d_55.\n" +
        "a_16 -< ~a_12,~d_52,d_56.\n" +
        "a_16 -< d_57,~a_12,~d_52.\n" +
        "a_16 -< ~a_12,~d_52,d_58.\n" +
        "a_16 -< d_59,~a_12,~d_52.\n" +
        "a_16 -< d_60,~a_12,~d_53.\n" +
        "a_16 -< ~a_12,~d_61,~d_53.\n" +
        "a_16 -< ~a_12,d_62,~d_53.\n" +
        "a_16 -< d_63,~a_12,~d_53.\n" +
        "a_16 -< a_7,~d_64,~d_54.\n" +
        "a_16 -< a_7,~d_65,~d_55.\n"

    /* "7": "use_criterion(more_specific).\n\n" +

        "~culpable(X) -< not culpable(X).\n" +
        "~preso(X) <- inocente(X).\n" +
        "inocente(X) <- ~culpable(X).\n" +
        "preso(X) -< not culpable(X), alta-sospecha(X).\n" +
        "alta-sospecha(pepe) ." */

}
