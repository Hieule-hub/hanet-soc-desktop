import React, { useState, useEffect, useRef } from 'react';
import { Player, ControlBar, BigPlayButton } from 'video-react';

export interface VideoState {
    paused: boolean;
    currentTime?: number;
}

interface Props {
    src: string;
    state: VideoState;
    head?: boolean;
    changeState: (state, prevState) => void;
}

const VideoPlayer: React.FC<Props> = ({ src, state, head = false, changeState }) => {
    const videoRef = useRef<any>(null);

    const { paused, currentTime = 0 } = state;
    useEffect(() => {
        if (paused) {
            // setIsPlaying(false);
            videoRef.current?.pause();
        } else {
            videoRef.current?.play();
        }
    }, [paused]);

    useEffect(() => {
        if (src) {
            videoRef.current.load();
        }
    }, [src]);

    // useEffect(() => {
    //     if (head) {
    //         videoRef.current.subscribeToStateChange(changeState);
    //     }
    // }, []);

    return (
        <Player
            autoPlay
            ref={videoRef}
            // poster="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8SDxUQDxAQEA8PEg8PDw8PEA8PDw8PFRUXFhURFRcYHSggGBolHRUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQwNGg8PGDclHSUuKysrKzc3Nys3KzctLjc3KzctNy03LTM4Ny03OC0rLTcrNCs3KysrNysrLSsrNzMrLv/AABEIALcBFAMBIgACEQEDEQH/xAAcAAADAQEBAQEBAAAAAAAAAAAAAQIDBAUHCAb/xAA5EAACAgECBAMFBwMEAgMAAAAAAQIRAyExBBJBUQVhcRMigZGhBgcUUrHB8EJi0SMycpLh8XOCov/EABUBAQEAAAAAAAAAAAAAAAAAAAAD/8QAGhEBAQACAwAAAAAAAAAAAAAAAAEDIQKR8f/aAAwDAQACEQMRAD8A+pOTbt6tghDAaGJDAaKRKKQDlsSinsSgKRSJQwGxoljQFoUwQTAgYgAoZIWBYxJPsOv5oAS2+DJsctvgZgXYWQFgZIZNhYFEz2+QWKb0+QEgAAAAAAAABePPOKqMmkMzABjEMBjEhoBopEoaActhDexIFIolDQDYAwApBPYSCewE2Fk2O61f882BaXf/AMs8rx37T8Fwavic+PE2rjC3PNNd4wjcn6pHzr7c/eg7lw/hslpccnGUpK+qwp6P/m7Xa9GfKs85zk8mSUpzm7lOcnKc33berA+xcf8AfLwsW1g4XPmraWSUMEZen+5/NHPwf30Y2/8AW4HJBd8OeGZ16SjA+QsJR0A/Tf2d+1XB8dBy4XKpuKueKScMsP8AlB6157eZ6tn5W8M8QzcPmhn4ebx5cTuMls+8ZLrF7NH6V+zvi8OM4TFxUFSzQuUbvkyJ8s4fCSaA9SwsmwsDOwsSAB2KW3y/UBS/wAwAAAAAAABAMBABQISGAxoQwKGSMCuj+BI+nyJApFIhF8rq+gAwQMEAwnsApbAQj5T97f2xkm/DuGlWi/GZIvWmrXDp+aacvJpfmR9B+1Hi64Tg83Eum8UG4Re0ssmo44+jlKK+J+asuWU5SnOTlOcpTnN7ynJ3KT8222BDKSlLRaijG2l3O2fupRjVvu6XqwOPJikt0ZybOyUnyPm815M4mAj7n9yE5S8KyJ7YuLyxh/xePHN//qUj4Yz9H/dT4W+H8IwRmqnm5+Jkmqa9q7in/wDXlA9+wsJqm0ICUAkMAFL90MUunqAwAAAAAAAAAAAAGAAAxgu/yKx45Suldb7AJG0oJJNPVmLVaPcdr49X3A6cOFO1LRqnaerRNJcyeqT0Ihkat76fuJyvV73t0oAjDS+xUZvbdLoL2ujVJJ9uhKA6ai46aNbVuzBdhdAA2jjvRf7luRNaea+uoQm07Qcz367gfNvvv4iUOBxYtva8TDmXeMMc5V8+V/A+Ln2/76eCll8PjlSv8Nnx5JUr/wBOSlib+c4Hw9gPHKmn2OqefG9XdrbR2ep4X4T4fkxQlm49YcraeWDjcYQ5p6R096XLGHWk59ap9WPwTwlQi8niLlk91ZY4uSMYyq5yjzQblHovNPXUnckniVy8ZrfVfzObNzeSWyMC8rjb5VJRt8qm05KPTmaSTfojs8D8H4jjM8eH4aHPklq3tDHDrkyS/piu/wAFb0KKvT+wf2Zl4hxsMLT9hCsvFS6Rwp/7fWT91fF9D9NRSSSSSSSSS2SWyP5v7G/Z3D4fwywYvenKp581VLNlreukVsl0R708tIDDJu/UkYwM47DFHYYBRM+nqUTPp6gMAAAAAAAAAAAAAAAAufReX66l4c7jtWvcjJ0fdL6afsSBfPbbau7+b6jUXV9FoOGK43r1+hKquvNenagOzJjh7O12Tvv5HEjWco8ui1r918zECxolMYFdAQgAob2JCWwGHF8NDLjliyRU8eSMoThLaUJKnF+qZ8G+1/2B4rg5ylihPiOEtuGSCc8mOP5csVqq/MtH5bH3yyZxT0fzTaa801sB+VOdd18zThsUskuTFGWWf5MUZZJ/KNs/RXivhM370YYs3/yYMGTIvjKLs8rHx+SHuS/0v7YxjhT+EUgPnngP3bcXlalxb/B4esZVPiZr+3GnUPWbVdmfWPAPCuG4TF7Hhcaxwes5N82XLL82SX9T+i6JHJi4lPqu+51Y+J7age1DNRUJuTvovqziwYJy1lcY9v6n/g9OCjyqKWv0oBBZrm4dxV2nvt0/lmLAmOwxR2XohgBGTp6lkZOnr+zAYCABgIAGAgAAAAGAABa1Xpr8Hv8AsLHKnevw0YounY5Lts9gEVGLbS71RtgUeXWnu3taX8/Uy9pK071SpaIDT2L1Wmq/dGMlTrsduDC5Lmk99Elo6vc48sak1d09wEmWjNFJgVISYSegkwLCWzFYpPQCBSklvockuNjdR1fetDXHhcnbdgTPLOWmNV/c/wBkLh/Bbbc25t025O7a2/V/M9PDgrod2KIHmQ8KhH3oxSkusfdddjN40naS160k/ie7KOh5PG46lfR/qBgx2Q2MDpwZI3c9e16/CjKk5dk316IgALnCKpKXMSPE7STuq6VepXs3dVV9/wBQMyZ9PX9mb58Ti6etqzGfT1/ZgFAVQUBI6HQAKgoqgoCaAqgAgYAADi+j2/TzEADaCMqdrdagn0f/AKE0Bqs8qlrurfzS+BOGH9SaXL8RxiuV6+9so/FEwwNunpW9gStRlZVyulo11T11/Q2y5ouNL0S2oDnk9CUxZHp8TPnA3sUnp/O5lzhKVoDxeHl73xPd4aSPM4jw1ttxcfOPMou/JmChlg9OZenvL6Af1mBndBH8hw3jGWO6Ukt+jPY4Px/C9JPkf923zA9ho4+LxXFrruvU64ZYtWmmu6IyzVAfzzkaWHHRSk2tnr6Mz5wNbCzLnDmA2xvReiNOZyerSpb7GUNl6IoDRY29Xt3fYjNFJxSd6/szXBb0/pW61VmUqtKteZ630pgOgosVATQUVQ6AmgoqgoBUIqgAxAw9s+we2fYDcDD2z7B7V9v58wNxo5/avt9A9q/4gOjmpN3st9uqMvxWt82r3don2r1T6+RNAV7Zd180dHD4pTVxqk6u+pzHbwXGcseVxbrZxSvXuBy5k/8Aa9GnqtBw4duPMn1pKtX6GnEc05OWy2V9Eb5Z2lVpppqujA4JQadPRrpSFXn+h1zwu7k229b0JeFAczJlBPdWdSweQvYgcE+HlvCbT6c3vfC96+JxT4bJ1gn543a/6un+p7vsg9iB4WDPkxO4OUerWvL8Ys9fh/Geb3ZKpdGtmbPCg9guy7aKgMJtvV9RV/KRu8I/YLzA56/lBX8o3eDzJeF+QCjlVL0Q/aonka3QqA1jnrZ0XhmpZI0tE26vpTOejbLw04JTaWj16vVMDtz5U3telX5mSV6fL/Bng5nLlnUdLS2bvYzycUv6U7t23s1elAb0FHPLiXV15PR7k/in2+jA6h0cn4p9vox/i32+jA6qA5fxb7fRgBiADAQwAAAAAGAmLmAcpUr7am/DcRjmvckn/btJfA48s/dfo/0PAvUD+yo0wR1P5bh+Nyracvi+b9T0MHiuVflfqv8AAHs5Irzt6vsEUut7aUedHxJveKfxaNo8cvyv52B2QyUq/jRlRnLik1oqfczbvdgbuSW7XzLjBuPMtVrtvp5HNHEu/wCp6OPMlBJbpJLtfcDh9tHv9GaRkns0ZrhfNfU0x8J1v5JgNoOU3WPu/oHKvMDDlBxN2vITWl6AY8hzZavT+M2zys5b1AqEbaW16anTxmTI/d3WjdR6efyMs2VOlGKil23Hg4lRTtN3rpv52wMcmS5cySW1Ldaeo4RT5nKVPdLuypw93nf9T0prR31R1cBxGOMWpaPW21aYHFj6ruvqtf56kGia57Spc2i7KzMAAAAAGAAAAAAAAAAAESMZyOhozljA4M+R0eXep7WfBafozxZQlF6r49AN8bOmDOODOnGwOuDN4M5YM3gwOzhpJSi3smm/RM9LiuIhKD5Wm3XR39Tx4M1iwOrErddzVxp0c0JGql3A3xy1RvfzObn0S7X6spzbA0sXMQ/X/wAGmKWlefawJ59dduptmVR92tPqjmyPUzlPa9UugGWVmanHlar3r0ZvxeeLSitZtql/UvI4oppu1TvZ7oDt4TEsk25UkltHTysz43BySpO01a7r1Moya1TafdaFzypp8ybm6qXRLsBMcUnFyrRfXuQVDNJJpOkyALh37fqSFgAAAAMBAAwEMAAAAAAAAAACZrQ4pY0d0jmaA5Hwke1emgLhH0l81f6HVQ0gOZYpLs/iaR5vyv6f5Nx0BnGfr/1kaxyrz+TQJFUBUc0e6+Zos8fzL5oySGkB0LiI9/lbH+Jj3f8A1l/g56HQG74qPaT+FfqC41rZP4tL/JhyhQFz4mb1qK+b/wAGMpSe7fw0/QqgoDNKtVp100NOZttt23uxNDigGSy6BoCKCiqNIrQDEYMAAAAAAAArJBxbi91oyQABgAAAAAAAAAmZSiAATQUAANIpIAAaGgACkNAAFJDAAATGAEioAABoAA0ghZBABBaYABmwAAAAADpwcFOa5opVtqwAAP/Z"
        >
            <source src={src} type="video/mp4" />
            <BigPlayButton position="center" className="hanet-big-button" />
            <ControlBar autoHide className="hanet-controlbar-video" />
        </Player>
    );
};

export default VideoPlayer;
