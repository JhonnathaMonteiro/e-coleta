import 'package:flutter/material.dart';

class CarouselPage extends StatefulWidget {
  static const routeName = '/carousel_page';
  @override
  _CarouselPageState createState() => _CarouselPageState();
}

class _CarouselPageState extends State<CarouselPage> {
  PageController _pageController;
  int currentIndex = 0;

  @override
  void initState() {
    super.initState();
    _pageController = PageController(initialPage: 0);
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final fullWidth = MediaQuery.of(context).size.width;
    final fullHeight = MediaQuery.of(context).size.height;

    return Scaffold(
      backgroundColor: Colors.white,
      body: Stack(
        children: <Widget>[
          PageView(
            controller: _pageController,
            onPageChanged: (int page) {
              setState(() {
                currentIndex = page;
              });
            },
            children: <Widget>[
              makePage(
                  fullWidth: fullWidth,
                  fullHeight: fullHeight,
                  title: "REDUCE",
                  image: 'figure-1.png'),
              makePage(
                  fullWidth: fullWidth,
                  fullHeight: fullHeight,
                  title: "RECYCLING",
                  image: 'figure-2.png',
                  reverse: true),
              makePage(
                  fullWidth: fullWidth,
                  fullHeight: fullHeight,
                  title: "REUCE",
                  image: 'figure-3.png'),
            ],
          ),
        ],
      ),
    );
  }

  Widget makePage(
      {image, title, content, fullWidth, fullHeight, reverse = false}) {
    return Container(
      child: Column(
        children: <Widget>[
          Container(
            height: fullHeight,
            width: double.infinity,
            child: Stack(
              alignment: Alignment.topCenter,
              children: <Widget>[
                Positioned(
                  width: fullWidth,
                  height: 475,
                  bottom: reverse ? 0 : null,
                  child: Container(
                    decoration: BoxDecoration(
                      image: DecorationImage(
                        image: AssetImage(!reverse
                            ? 'assets/images/top-background-2.png'
                            : 'assets/images/bottom-background-2.png'),
                        fit: BoxFit.fill,
                      ),
                    ),
                  ),
                ),
                Positioned(
                  width: fullWidth,
                  height: 475,
                  top: reverse ? null : -20,
                  bottom: reverse ? -20 : null,
                  child: Container(
                    decoration: BoxDecoration(
                      image: DecorationImage(
                        image: AssetImage(!reverse
                            ? 'assets/images/top-background-1.png'
                            : 'assets/images/bottom-background-1.png'),
                        fit: BoxFit.fill,
                      ),
                    ),
                  ),
                ),
                Positioned(
                  top: 40,
                  child: Container(
                    height: 180,
                    child: Image.asset(
                      !reverse
                          ? 'assets/images/clouds-1.png'
                          : 'assets/images/clouds-2.png',
                    ),
                  ),
                ),
                Positioned(
                  top: 40,
                  child: Container(
                    height: 180,
                    child: Image.asset(
                      'assets/images/$image',
                    ),
                  ),
                ),
                Column(
                  // crossAxisAlignment: CrossAxisAlignment.end,
                  mainAxisAlignment: MainAxisAlignment.end,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    Text(
                      title,
                      style: TextStyle(
                        fontSize: 35,
                      ),
                    ),
                    SizedBox(
                      height: 60,
                    ),
                    SizedBox(
                      width: 310,
                      child: Text(
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 17,
                        ),
                      ),
                    ),
                    SizedBox(height: 60),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Padding(
                          padding: const EdgeInsets.all(10.0),
                          child: SizedBox(
                            height: 40,
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              crossAxisAlignment: CrossAxisAlignment.end,
                              children: _buildIndicator(
                                reverse ? Colors.white : Color(0xFF9D9D9D),
                              ),
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(10.0),
                          child: Text(
                            'Skip',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w400,
                            ),
                          ),
                        ),
                      ],
                    )
                  ],
                )
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _indicator(bool isActive, Color color) {
    return AnimatedContainer(
      duration: Duration(milliseconds: 300),
      width: 11,
      height: isActive ? 35 : 18,
      margin: EdgeInsets.only(right: 5),
      decoration: BoxDecoration(
        color: isActive ? color : color.withOpacity(.5),
        borderRadius: BorderRadius.circular(5),
      ),
    );
  }

  List<Widget> _buildIndicator(Color color) {
    List<Widget> indicators = [];
    for (int i = 0; i < 3; i++) {
      if (currentIndex == i) {
        indicators.add(_indicator(true, color));
      } else {
        indicators.add(_indicator(false, color));
      }
    }

    return indicators;
  }
}
