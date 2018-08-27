import React, { Component } from "react";
import { StyleSheet, ScrollView, Dimensions, Text, View } from "react-native";
import PropTypes from "prop-types";
import times from "lodash.times";
const GAUGE_WIDTH = Math.floor(Dimensions.get("window").width);
const INTERVAL_WIDTH = 14;

const scale = (v, inputMin, inputMax, outputMin, outputMax) => {
  return Math.round(
    ((v - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) +
      outputMin
  );
};

export default class LineGauge extends Component {
  constructor(props) {
    super(props);

    this._handleScroll = this._handleScroll.bind(this);
    this._handleScrollEnd = this._handleScrollEnd.bind(this);

    this.scrollMin = 0;
    this.scrollMax = this._getScrollMax(props);
    this._value = props.value || props.min;

    this.state = {
      contentOffset: this._scaleValue(this._value)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.scrollMax = this._getScrollMax(nextProps);
  }

  _contentSizeWillChange(nextProps) {
    let { min, max } = nextProps;
    if (min !== this.props.min || max !== this.props.max) {
      return true;
    }

    return false;
  }

  _getScrollMax(props = this.props) {
    return (props.max - props.min) * INTERVAL_WIDTH;
  }

  _scaleScroll(x, props = this.props) {
    let { min, max } = props;
    return scale(x, this.scrollMin, this.scrollMax, min, max);
  }

  _scaleValue(v, props = this.props) {
    let { min, max } = props;
    return scale(v, min, max, this.scrollMin, this.scrollMax);
  }

  _handleScroll(event) {
    let offset = event.nativeEvent.contentOffset.x;
    let { min, max } = this.props;

    let val = this._scaleScroll(offset);

    if (val !== this._value) {
      this._value = val;
      this.props.onChange(val);
    }
  }

  _handleScrollEnd() {
    this._value = this.props.value;
  }

  _getIntervalSize(val) {
    let { largeInterval, mediumInterval } = this.props;

    if (val % largeInterval == 0) return "large";
    if (val % mediumInterval == 0) return "medium";
    return "small";
  }

  _renderIntervals() {
    let { min, max } = this.props;
    let range = max - min + 1;

    let values = times(range, i => i + min);

    return values.map((val, i) => {
      let intervalSize = this._getIntervalSize(val);

      return (
        <View key={`val-${i}`} style={styles.intervalContainer}>
          {intervalSize === "large" && (
            <Text
              style={[styles.intervalValue, this.props.styles.intervalValue]}
            >
              {val}
            </Text>
          )}

          <View
            style={[
              styles.interval,
              styles[intervalSize],
              this.props.styles.interval,
              this.props.styles[intervalSize]
            ]}
          />
        </View>
      );
    });
  }

  render() {
    return (
      <View style={[styles.container, this.props.styles.container]}>
        <ScrollView
          ref={r => (this._scrollView = r)}
          automaticallyAdjustInsets={false}
          horizontal={true}
          decelerationRate={"fast"}
          snapToInterval={INTERVAL_WIDTH}
          snapToAlignment="start"
          showsHorizontalScrollIndicator={false}
          onScroll={this._handleScroll}
          scrollEventThrottle={16}
          contentOffset={{ x: this.state.contentOffset }}
        >
          <View style={[styles.intervals, this.props.styles.intervals]}>
            {this._renderIntervals()}
          </View>
        </ScrollView>

        <View style={[styles.centerline, this.props.styles.centerline]} />
      </View>
    );
  }
}

LineGauge.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  largeInterval: PropTypes.number,
  mediumInterval: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func,
  styles: PropTypes.object
};

LineGauge.defaultProps = {
  min: 1,
  max: 100,
  mediumInterval: 5,
  largeInterval: 10,
  onChange: () => {},
  styles: {}
};

const styles = StyleSheet.create({
  container: {
    height: 55,
    width: GAUGE_WIDTH,
    borderColor: "#C0D8F5",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#F9F9F9",
    marginVertical: 8
  },
  intervals: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: GAUGE_WIDTH / 2,
    marginHorizontal: -INTERVAL_WIDTH / 2
  },
  intervalContainer: {
    width: INTERVAL_WIDTH,
    alignItems: "center"
  },
  interval: {
    width: 1,
    marginRight: -1,
    backgroundColor: "#4A90E2"
  },
  intervalValue: {
    fontSize: 10,
    marginBottom: 3
  },
  small: {
    height: 10
  },
  medium: {
    height: 15
  },
  large: {
    backgroundColor: "#4A90E2",
    width: 2,
    height: 20
  },
  centerline: {
    height: 54,
    width: 1,
    backgroundColor: "red",
    position: "absolute",
    left: GAUGE_WIDTH / 2,
    opacity: 0.6,
    top: 0,
    zIndex: -1
  }
});
