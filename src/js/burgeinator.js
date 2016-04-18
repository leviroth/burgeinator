var Burgeinator = {
    verify: function(text, limit) {
        sentences = text.split(/[.!?][)"'\u2019\u201D]*\s/gi);

        var violators = [];

        for (i = 0; i < sentences.length; ++i)
        {
            ourLength = sentences[i].split(' ').length;
            if (ourLength > limit)
            {
                violators.push({sentence: sentences[i], size: ourLength});
            }
        }

        return violators;
    }
}
