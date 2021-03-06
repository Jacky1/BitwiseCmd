import React from 'react';
import CommandLink from '../../core/components/CommandLink';
import './HelpResultView.css';

function HelpResultView() {
    
        return <div className="help helpResultTpl">
                        <div className="panel-container">
                            <div className="left-panel">
                                <div className="section">
                                    <strong className="section-title soft">Bitiwse Calculation Commands</strong>
                                <ul>
                                    <li><code><CommandLink text="23 | 34" /></code> — type bitwise expression to see result in binary (only positive integers are supported now)</li>
                                    <li><code><CommandLink text="23 34" /></code> — type one or more numbers to see their binary representations</li>
                                </ul>
                                </div>
                                <div className="section">
                                    <strong className="section-title  soft">IP Address Commands</strong>
                                <ul>
                                    <li><code><CommandLink text="127.0.0.1" /></code> — enter single or multiple ip addresses (separated by space) to see their binary represenation</li>
                                    <li><code><CommandLink text="192.168.0.1/8" /></code> — subnet mask notiations are support as well</li>
                                    <li><code><CommandLink text="subnet 192.168.24.1/14" /></code> — display information about subnet (network address, broadcast address, etc.)</li>
                                </ul>
                                </div>
                                <div className="section">
                                    <strong className="section-title  soft">Color Theme Commands</strong>
                                <ul>
                                    <li><code><CommandLink text="light" /></code> — set Light color theme</li>
                                    <li><code><CommandLink text="dark" /></code> — set Dark color theme</li>
                                    <li><code><CommandLink text="midnight" /></code> — set Midnight color theme</li>
                                </ul>
                                </div>
                                <div className="section">
                                    <strong className="section-title  soft">Other Commands</strong>
                                <ul>
                                    <li><code><CommandLink text="clear" /></code> — clear output pane</li>
                                    <li><code><CommandLink text="help" /></code> — display this help</li>
                                    <li><code><CommandLink text="whatsnew" /></code> — display changelog</li>
                                    <li><code><CommandLink text="em" /></code> — turn On/Off Emphasize Bytes</li>
                                    <li><code><CommandLink text="about" /></code> — about the app</li>
                                    <li><code><CommandLink text="guid" /></code> — generate <a href="https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_.28random.29">v4</a> GUID</li>
                                </ul>
                                </div>
                            </div>
                            <div className="right-panel">
                                <div className="section">
                                    <strong className="section-title soft">Supported Bitwise Operations</strong><br/>
                                    <small>
                                        <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators">
                                            as implemented in JavaScript engine of your browser
                                        </a>
                                    </small>
                                    <ul>
                                        <li><code>&amp;</code> — bitwise AND</li>
                                        <li><code>|</code> — bitwise inclusive OR</li>
                                        <li><code>^</code> — bitwise exclusive XOR</li>
                                        <li><code>~</code> — bitwise NOT</li>
                                        <li><code>&lt;&lt;</code> — left shift</li>
                                        <li><code>&gt;&gt;</code> — sign propagating right shift</li>
                                        <li><code>&gt;&gt;&gt;</code> — zero-fill right shift</li>
                                    </ul>
                                </div>
                                <div className="section">
                                    <strong className="section-title  soft">Tip</strong>
                                    <p>
                                        You can click on bits to flip them in number inputs (e.g. <CommandLink text="2 4" />) or IP addresses (e.g. <CommandLink text="192.168.0.0/8"/>)
                                    </p>
                                </div>
                          </div>
                     </div>
                 </div>;
}

export default HelpResultView;
