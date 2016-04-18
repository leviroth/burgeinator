String.prototype.pluralize = function(count, plural){
    if (plural == null)
        plural = this + 's';

    return count == 1 ? this : plural;
}

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
    },

    update: function() {
        $("#output").empty();

        limit = $("#limit").val();
        if (!$.isNumeric(limit))
        {
            $("#error").text("We need a number here.");
            return;
        }
        else
        {
            $("#error").empty();
        }

        violators = Burgeinator.verify($("#essay").val(), limit);

        console.log("foo");

        var numWrong = violators.length;

        if (numWrong == 0)
        {
            $("#output").append($("<h4/>").text("Congratulations - we couldn't find anything wrong."))
        }
        else
        {
            var verdict = $('<dl/>');
            verdict.addClass("dl-horizontal");

            for (i = 0; i < numWrong; ++i)
            {
                $("<dt/>").text(violators[i].size + " words").appendTo(verdict);
                $("<dd/>").text(violators[i].sentence).appendTo(verdict);
            }

            $("<h4/>").text("We found " + numWrong + " " + "sentence".pluralize(numWrong)
                    + " over " + limit + " words:").appendTo($("#output"));
            $("#output").append(verdict);

        }
    }
};
