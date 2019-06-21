$("[href=\"#secao-formulario\"]").click
(
    function()
    {
        setTimeout
        (
            function()
            {
                $("input[name=\"nome\"]").focus();

            }, 650
        );
    }
);

function scrollTo(element)
{
    $([document.documentElement, document.body]).animate
    (
        {
            scrollTop: ( $(element).offset().top - 20 ) + "px"
        }, 600
    );
}

function activeEaseScroll(elementSelector)
{
    var clickable = $("[href=\"" + elementSelector + "\"]").click
    (
        function(event)
        {
            event.preventDefault();

            scrollTo( $(elementSelector) );
        }
    );
}

$
(
    function()
    {
        activeEaseScroll("#secao-conf");
        activeEaseScroll("#secao-palestrantes");
        activeEaseScroll("#secao-formulario");
    }
);
