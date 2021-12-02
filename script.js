/**
 * *****************************************************************************
 * CONST
 * *****************************************************************************
 */
const keyAssociations = [
{
  keyCode: 81,
  keyName: "Q",
  soundId: "jhd_prc_6",
  src: "https://freesound.org/data/previews/191/191634_2394245-lq.mp3" },

{
  keyCode: 87,
  keyName: "W",
  soundId: "acoustic_kick",
  src: "https://freesound.org/data/previews/371/371192_6399962-lq.mp3" },

{
  keyCode: 69,
  keyName: "E",
  soundId: "snare_mystic_180_ms",
  src: "https://freesound.org/data/previews/528/528461_3797507-lq.mp3" },

{
  keyCode: 65,
  keyName: "A",
  soundId: "DRUM_FX_3",
  src: "https://freesound.org/data/previews/84/84479_377011-lq.mp3" },

{
  keyCode: 83,
  keyName: "S",
  soundId: "drum06",
  src: "https://freesound.org/data/previews/4/4831_7423-lq.mp3" },

{
  keyCode: 68,
  keyName: "D",
  soundId: "SH01a_Bass_Drum_004",
  src: "https://freesound.org/data/previews/459/459895_4448255-lq.mp3" },

{
  keyCode: 90,
  keyName: "Z",
  soundId: "Aint_that_Fun_Bass_Drum",
  src: "https://freesound.org/data/previews/25/25602_48671-lq.mp3" },

{
  keyCode: 88,
  keyName: "X",
  soundId: "Kick_Drum_D#_-1",
  src: "https://freesound.org/data/previews/132/132583_2409787-lq.mp3" },

{
  keyCode: 67,
  keyName: "C",
  soundId: "drum_loops_35",
  src: "https://freesound.org/data/previews/64/64671_846180-lq.mp3" }];


/**
 * *****************************************************************************
 * REACT
 * *****************************************************************************
 */

/**
 * -----------------------------------------------------------------------------
 * Drum Keyboard
 * -----------------------------------------------------------------------------
 */
class DrumKeyboard extends React.Component {
  /**
   * Constructor
   * -------------------------------------------------------------------------
   */
  constructor(props) {
    super(props);
  }
  /**
   * Render
   * -------------------------------------------------------------------------
   */
  render() {
    return keyAssociations.map(keyAssociation => {
      return React.createElement(
      "div",
      {
        id: keyAssociation.soundId,
        className:
        "drum-pad col-4 text-center btn btn-outline-secondary",
        onClick: () =>
        this.props.handleClick(
        keyAssociation.keyName,
        keyAssociation.soundId) },


      [
      keyAssociation.keyName,
      React.createElement("audio", {
        className: "clip",
        id: keyAssociation.keyName,
        src: keyAssociation.src })]);



    });
  }}

/**
 * -----------------------------------------------------------------------------
 * Display
 * -----------------------------------------------------------------------------
 */
class Display extends React.Component {
  /**
   * Constructor
   * -------------------------------------------------------------------------
   */
  constructor(props) {
    super(props);
  }
  /**
   * Render
   * -------------------------------------------------------------------------
   */
  render() {
    return React.createElement(
    "div",
    { id: "display", className: "col-12 text-center p-3 my-2 border" },
    this.props.display);

  }}

/**
 * -----------------------------------------------------------------------------
 * Drum Machine
 * -----------------------------------------------------------------------------
 */
class DrumMachine extends React.Component {
  /**
   * Constructor
   * -------------------------------------------------------------------------
   */
  constructor(props) {
    super(props);
    this.state = {
      display: "-" };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDisplay = this.handleDisplay.bind(this);
    this.playSound = this.playSound.bind(this);
  }
  /**
   * ComponentDidMount
   * -------------------------------------------------------------------------
   */
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }
  /**
   * HandleKeyDown
   * -------------------------------------------------------------------------
   */
  handleKeyDown(e) {
    const button = keyAssociations.find(
    keyAssociation => keyAssociation.keyCode === e.keyCode);

    if (button) this.handleClick(button.keyName, button.soundId);
  }
  /**
   * HandleClick
   * -------------------------------------------------------------------------
   */
  handleClick(keyName, soundId) {
    this.handleDisplay(soundId);
    this.playSound(keyName);
  }
  /**
   * HandleDisplay
   * -------------------------------------------------------------------------
   */
  handleDisplay(soundId) {
    this.setState({ display: soundId });
  }
  /**
   * PlaySound
   * -------------------------------------------------------------------------
   */
  playSound(soundId) {
    const audio = document.getElementById(soundId);
    audio.currentTime = 0;
    audio.play();
  }
  /**
   * Render
   * -------------------------------------------------------------------------
   */
  render() {
    return React.createElement(
    "div",
    {
      id: "drum-machine",
      className:
      "row w-50 shadow border border-secondary rounded p-2" },

    [
    React.createElement(Display, { display: this.state.display }),
    React.createElement(DrumKeyboard, {
      handleClick: this.handleClick })]);



  }}

/**
 * *****************************************************************************
 * RENDER
 * *****************************************************************************
 */
const container = document.getElementById("app");
container.className =
"container d-flex flex-column min-vh-100 justify-content-center align-items-center";
ReactDOM.render(React.createElement(DrumMachine, null), container);