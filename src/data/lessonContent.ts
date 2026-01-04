export const lessonContent: Record<string, { content: string; quizQuestions: { question: string; options: string[]; correctAnswer: number; explanation: string; }[] }> = {
  // Beginner lessons
  'what-is-a-stock': {
    content: `
      <h2>What is a Stock?</h2>
      <p>A <strong>stock</strong> represents ownership in a company. When you buy a stock, you're purchasing a small piece of that business, making you a <em>shareholder</em>.</p>
      
      <h3>Key Concepts</h3>
      <ul>
        <li><strong>Share:</strong> A single unit of stock ownership</li>
        <li><strong>Shareholder:</strong> Someone who owns shares in a company</li>
        <li><strong>Equity:</strong> Another term for stock ownership</li>
      </ul>
      
      <h3>Why Companies Issue Stock</h3>
      <p>Companies sell stock to raise money for growth, research, or paying off debt. In return, investors get the potential to profit if the company does well.</p>
      
      <h3>Two Ways to Make Money</h3>
      <ol>
        <li><strong>Capital Gains:</strong> Selling your stock for more than you paid</li>
        <li><strong>Dividends:</strong> Cash payments some companies give to shareholders</li>
      </ol>
    `,
    quizQuestions: [
      {
        question: "What does owning a stock represent?",
        options: ["A loan to the company", "Ownership in the company", "A job at the company", "A promise of future payment"],
        correctAnswer: 1,
        explanation: "When you buy a stock, you're buying partial ownership in the company, making you a shareholder."
      },
      {
        question: "What is a dividend?",
        options: ["A fee you pay to buy stocks", "A type of stock", "Cash payment from company to shareholders", "The stock's price"],
        correctAnswer: 2,
        explanation: "Dividends are cash payments that some companies distribute to their shareholders as a share of profits."
      }
    ]
  },
  'how-stock-market-works': {
    content: `
      <h2>How the Stock Market Works</h2>
      <p>The stock market is a marketplace where buyers and sellers trade stocks. Think of it like an auction where prices change based on supply and demand.</p>
      
      <h3>Major Stock Exchanges</h3>
      <ul>
        <li><strong>NYSE (New York Stock Exchange):</strong> The largest stock exchange in the world</li>
        <li><strong>NASDAQ:</strong> Known for technology companies like Apple and Google</li>
      </ul>
      
      <h3>Market Hours</h3>
      <p>The US stock market is open Monday through Friday, 9:30 AM to 4:00 PM Eastern Time. There's also pre-market (4:00-9:30 AM) and after-hours trading (4:00-8:00 PM).</p>
      
      <h3>How Prices Move</h3>
      <p>Stock prices change based on supply and demand:</p>
      <ul>
        <li>More buyers than sellers = price goes up</li>
        <li>More sellers than buyers = price goes down</li>
      </ul>
    `,
    quizQuestions: [
      {
        question: "What are the regular trading hours for US stock markets?",
        options: ["8 AM - 5 PM", "9:30 AM - 4:00 PM", "10 AM - 3 PM", "24 hours"],
        correctAnswer: 1,
        explanation: "Regular US stock market hours are 9:30 AM to 4:00 PM Eastern Time, Monday through Friday."
      },
      {
        question: "What happens when there are more buyers than sellers?",
        options: ["Price stays the same", "Price goes down", "Price goes up", "Trading stops"],
        correctAnswer: 2,
        explanation: "When demand (buyers) exceeds supply (sellers), the price increases as buyers compete to purchase shares."
      }
    ]
  },
  'reading-stock-quotes': {
    content: `
      <h2>Reading Stock Quotes</h2>
      <p>A stock quote shows you key information about a stock's current price and trading activity.</p>
      
      <h3>Key Components</h3>
      <ul>
        <li><strong>Ticker Symbol:</strong> The abbreviated company name (e.g., AAPL for Apple)</li>
        <li><strong>Last Price:</strong> The most recent price the stock traded at</li>
        <li><strong>Change:</strong> How much the price moved today (in dollars and percentage)</li>
        <li><strong>Volume:</strong> How many shares have been traded today</li>
        <li><strong>Bid:</strong> The highest price buyers are willing to pay</li>
        <li><strong>Ask:</strong> The lowest price sellers are willing to accept</li>
      </ul>
      
      <h3>Understanding Colors</h3>
      <p><span style="color: green;">Green</span> = price is up from yesterday's close</p>
      <p><span style="color: red;">Red</span> = price is down from yesterday's close</p>
    `,
    quizQuestions: [
      {
        question: "What is a ticker symbol?",
        options: ["The stock's price", "An abbreviated company identifier", "The trading volume", "The exchange name"],
        correctAnswer: 1,
        explanation: "A ticker symbol is a unique series of letters assigned to a security for trading purposes, like AAPL for Apple."
      },
      {
        question: "What does 'volume' represent in a stock quote?",
        options: ["The stock's loudness", "Number of shares traded", "The company's size", "The price change"],
        correctAnswer: 1,
        explanation: "Volume refers to the total number of shares that have been bought and sold during a given time period."
      }
    ]
  },
  'types-of-orders': {
    content: `
      <h2>Types of Stock Orders</h2>
      <p>When you want to buy or sell a stock, you need to place an order. Different order types give you control over when and at what price your trade executes.</p>
      
      <h3>Market Order</h3>
      <p>Executes immediately at the current best available price. Use when speed matters more than price.</p>
      
      <h3>Limit Order</h3>
      <p>Only executes at your specified price or better. Use when you want price control.</p>
      <ul>
        <li><strong>Buy Limit:</strong> Buy at this price or lower</li>
        <li><strong>Sell Limit:</strong> Sell at this price or higher</li>
      </ul>
      
      <h3>Stop Order</h3>
      <p>Becomes a market order when the stock hits a trigger price. Often used to limit losses.</p>
      
      <h3>Stop-Limit Order</h3>
      <p>Combines stop and limit orders for more control.</p>
    `,
    quizQuestions: [
      {
        question: "Which order type guarantees immediate execution?",
        options: ["Limit order", "Stop order", "Market order", "Stop-limit order"],
        correctAnswer: 2,
        explanation: "Market orders execute immediately at the best available current price, prioritizing speed over price."
      },
      {
        question: "What is a limit order used for?",
        options: ["Fastest execution", "Price control", "Automatic selling", "Day trading only"],
        correctAnswer: 1,
        explanation: "Limit orders let you specify the exact price at which you want to buy or sell, giving you price control."
      }
    ]
  },
  'risk-management-basics': {
    content: `
      <h2>Risk Management Basics</h2>
      <p>Risk management is about protecting your capital while still allowing for profits. It's the foundation of successful trading.</p>
      
      <h3>Key Principles</h3>
      <ul>
        <li><strong>Never risk more than you can afford to lose</strong></li>
        <li><strong>Diversify:</strong> Don't put all your money in one stock</li>
        <li><strong>Position sizing:</strong> Limit each trade to a small % of your portfolio</li>
      </ul>
      
      <h3>The 1% Rule</h3>
      <p>Many traders never risk more than 1% of their portfolio on a single trade. With a $10,000 account, that's $100 maximum risk per trade.</p>
      
      <h3>Stop Losses</h3>
      <p>A stop loss automatically sells your position when it drops to a certain price, limiting your downside.</p>
      
      <h3>Risk-Reward Ratio</h3>
      <p>Before entering a trade, compare potential profit to potential loss. A 2:1 ratio means you're risking $1 to potentially make $2.</p>
    `,
    quizQuestions: [
      {
        question: "What does the 1% rule suggest?",
        options: ["Only trade 1% of the time", "Expect 1% returns daily", "Risk max 1% of portfolio per trade", "Diversify into 100 stocks"],
        correctAnswer: 2,
        explanation: "The 1% rule states you should never risk more than 1% of your total portfolio on any single trade."
      },
      {
        question: "What is a stop loss?",
        options: ["A type of stock", "An automatic sell order at a set price", "A trading fee", "A market indicator"],
        correctAnswer: 1,
        explanation: "A stop loss is an order that automatically sells your position when the price drops to a predetermined level."
      }
    ]
  },
  // Intermediate lessons
  'technical-analysis-intro': {
    content: `
      <h2>Introduction to Technical Analysis</h2>
      <p>Technical analysis is the study of past price movements to predict future price direction. It's based on the idea that history tends to repeat itself.</p>
      
      <h3>Core Principles</h3>
      <ul>
        <li><strong>Price discounts everything:</strong> All known information is reflected in the price</li>
        <li><strong>Prices move in trends:</strong> Once a trend starts, it tends to continue</li>
        <li><strong>History repeats:</strong> Patterns and behaviors recur over time</li>
      </ul>
      
      <h3>Chart Types</h3>
      <ul>
        <li><strong>Line charts:</strong> Simple, shows closing prices</li>
        <li><strong>Bar charts:</strong> Shows open, high, low, close (OHLC)</li>
        <li><strong>Candlestick charts:</strong> Most popular, visual and informative</li>
      </ul>
      
      <h3>Timeframes</h3>
      <p>Charts can show data from 1-minute intervals to monthly. Longer timeframes show the bigger picture while shorter timeframes show details.</p>
    `,
    quizQuestions: [
      {
        question: "What is the main idea behind technical analysis?",
        options: ["Studying company financials", "Predicting prices using past patterns", "Following news events", "Random stock picking"],
        correctAnswer: 1,
        explanation: "Technical analysis studies historical price data and patterns to forecast future price movements."
      },
      {
        question: "Which chart type is most popular among traders?",
        options: ["Line chart", "Bar chart", "Candlestick chart", "Pie chart"],
        correctAnswer: 2,
        explanation: "Candlestick charts are the most popular because they provide rich visual information about price action."
      }
    ]
  },
  'support-resistance': {
    content: `
      <h2>Support and Resistance</h2>
      <p>Support and resistance are key price levels where buying or selling pressure tends to emerge.</p>
      
      <h3>Support</h3>
      <p>A price level where buying interest is strong enough to prevent the price from falling further. Think of it as a "floor."</p>
      
      <h3>Resistance</h3>
      <p>A price level where selling interest is strong enough to prevent the price from rising further. Think of it as a "ceiling."</p>
      
      <h3>Key Concepts</h3>
      <ul>
        <li><strong>The more times a level is tested, the stronger it becomes</strong></li>
        <li><strong>Once broken, support becomes resistance (and vice versa)</strong></li>
        <li><strong>Round numbers often act as psychological support/resistance</strong></li>
      </ul>
      
      <h3>Trading Applications</h3>
      <p>Buy near support, sell near resistance. Place stop losses just beyond these levels.</p>
    `,
    quizQuestions: [
      {
        question: "What is support in trading?",
        options: ["A price level where selling is strong", "A price level where buying prevents further decline", "The highest price ever", "A type of order"],
        correctAnswer: 1,
        explanation: "Support is a price level where buying interest is strong enough to prevent prices from falling further."
      },
      {
        question: "What happens when support is broken?",
        options: ["It disappears", "It becomes resistance", "Price always goes up", "Trading stops"],
        correctAnswer: 1,
        explanation: "When support is broken, it often flips to become resistance, as previous buyers may now be sellers."
      }
    ]
  },
  'candlestick-patterns': {
    content: `
      <h2>Candlestick Patterns</h2>
      <p>Candlestick patterns are formations that can signal potential price reversals or continuations.</p>
      
      <h3>Anatomy of a Candlestick</h3>
      <ul>
        <li><strong>Body:</strong> The thick part showing open and close</li>
        <li><strong>Wick/Shadow:</strong> The thin lines showing high and low</li>
        <li><strong>Green/White:</strong> Close higher than open (bullish)</li>
        <li><strong>Red/Black:</strong> Close lower than open (bearish)</li>
      </ul>
      
      <h3>Common Reversal Patterns</h3>
      <ul>
        <li><strong>Doji:</strong> Open and close nearly equal - indecision</li>
        <li><strong>Hammer:</strong> Small body, long lower wick - potential bottom</li>
        <li><strong>Shooting Star:</strong> Small body, long upper wick - potential top</li>
        <li><strong>Engulfing:</strong> Large candle engulfs previous - strong reversal signal</li>
      </ul>
    `,
    quizQuestions: [
      {
        question: "What does a Doji candlestick indicate?",
        options: ["Strong uptrend", "Strong downtrend", "Market indecision", "Trading volume"],
        correctAnswer: 2,
        explanation: "A Doji forms when opening and closing prices are nearly equal, indicating indecision between buyers and sellers."
      },
      {
        question: "What might a hammer pattern at the bottom of a downtrend suggest?",
        options: ["Continue falling", "Potential reversal upward", "Increased volatility", "Nothing specific"],
        correctAnswer: 1,
        explanation: "A hammer at the bottom of a downtrend often signals that buyers are stepping in and a reversal may occur."
      }
    ]
  },
  'moving-averages': {
    content: `
      <h2>Moving Averages</h2>
      <p>Moving averages smooth out price data to help identify trends and potential support/resistance levels.</p>
      
      <h3>Types of Moving Averages</h3>
      <ul>
        <li><strong>SMA (Simple):</strong> Average of prices over X periods</li>
        <li><strong>EMA (Exponential):</strong> Gives more weight to recent prices</li>
      </ul>
      
      <h3>Common Periods</h3>
      <ul>
        <li><strong>20-day:</strong> Short-term trend</li>
        <li><strong>50-day:</strong> Medium-term trend</li>
        <li><strong>200-day:</strong> Long-term trend</li>
      </ul>
      
      <h3>Trading Signals</h3>
      <ul>
        <li><strong>Golden Cross:</strong> 50-day crosses above 200-day = bullish</li>
        <li><strong>Death Cross:</strong> 50-day crosses below 200-day = bearish</li>
        <li><strong>Price above MA:</strong> Generally bullish</li>
        <li><strong>Price below MA:</strong> Generally bearish</li>
      </ul>
    `,
    quizQuestions: [
      {
        question: "What is a Golden Cross?",
        options: ["Price hitting all-time high", "50-day MA crossing above 200-day MA", "Two stocks merging", "A type of candlestick"],
        correctAnswer: 1,
        explanation: "A Golden Cross occurs when the 50-day moving average crosses above the 200-day MA, considered a bullish signal."
      },
      {
        question: "Which moving average reacts faster to price changes?",
        options: ["SMA", "EMA", "They're the same", "200-day MA"],
        correctAnswer: 1,
        explanation: "The EMA (Exponential Moving Average) reacts faster because it gives more weight to recent prices."
      }
    ]
  },
  'volume-analysis': {
    content: `
      <h2>Volume Analysis</h2>
      <p>Volume measures how many shares are traded. It confirms price movements and can signal upcoming changes.</p>
      
      <h3>Key Principles</h3>
      <ul>
        <li><strong>Volume confirms trends:</strong> Rising prices with rising volume = strong trend</li>
        <li><strong>Divergence warns:</strong> Rising prices with falling volume = potential weakness</li>
        <li><strong>Climax volume:</strong> Extremely high volume often marks turning points</li>
      </ul>
      
      <h3>Volume Patterns</h3>
      <ul>
        <li><strong>Breakout confirmation:</strong> Breakouts with high volume are more reliable</li>
        <li><strong>Accumulation:</strong> High volume on up days, low on down days</li>
        <li><strong>Distribution:</strong> High volume on down days, low on up days</li>
      </ul>
      
      <h3>Volume Indicators</h3>
      <ul>
        <li><strong>OBV (On-Balance Volume):</strong> Cumulative volume indicator</li>
        <li><strong>Volume MA:</strong> Average volume to spot unusual activity</li>
      </ul>
    `,
    quizQuestions: [
      {
        question: "What does rising price with falling volume suggest?",
        options: ["Strong uptrend", "Potential weakness in the trend", "Time to buy more", "Nothing important"],
        correctAnswer: 1,
        explanation: "Rising prices with declining volume is a divergence that often signals weakness and a potential reversal."
      },
      {
        question: "What is accumulation in volume analysis?",
        options: ["High volume on down days", "High volume on up days, low on down days", "Equal volume every day", "No trading"],
        correctAnswer: 1,
        explanation: "Accumulation occurs when volume is higher on up days than down days, suggesting buyers are building positions."
      }
    ]
  },
  // Advanced lessons
  'advanced-chart-patterns': {
    content: `
      <h2>Advanced Chart Patterns</h2>
      <p>Complex patterns that form over longer periods and often lead to significant price moves.</p>
      
      <h3>Head and Shoulders</h3>
      <p>Three peaks where the middle (head) is highest. A bearish reversal pattern. The "neckline" connects the lows between peaks.</p>
      
      <h3>Double Top/Bottom</h3>
      <ul>
        <li><strong>Double Top:</strong> Two peaks at similar levels - bearish</li>
        <li><strong>Double Bottom:</strong> Two troughs at similar levels - bullish</li>
      </ul>
      
      <h3>Triangle Patterns</h3>
      <ul>
        <li><strong>Ascending:</strong> Flat top, rising bottom - usually bullish</li>
        <li><strong>Descending:</strong> Flat bottom, falling top - usually bearish</li>
        <li><strong>Symmetrical:</strong> Converging lines - breakout direction uncertain</li>
      </ul>
      
      <h3>Measuring Targets</h3>
      <p>Measure the pattern's height and project it from the breakout point for a price target.</p>
    `,
    quizQuestions: [
      {
        question: "What does a Head and Shoulders pattern typically indicate?",
        options: ["Continuation of uptrend", "Bearish reversal", "Bullish reversal", "Sideways movement"],
        correctAnswer: 1,
        explanation: "Head and Shoulders is a bearish reversal pattern that often marks the end of an uptrend."
      },
      {
        question: "What characterizes an ascending triangle?",
        options: ["Falling top and bottom", "Flat top and rising bottom", "Rising top and bottom", "Random price action"],
        correctAnswer: 1,
        explanation: "An ascending triangle has a flat resistance level (top) and rising support (bottom), typically bullish."
      }
    ]
  },
  'fibonacci-trading': {
    content: `
      <h2>Fibonacci in Trading</h2>
      <p>Fibonacci ratios are used to identify potential support, resistance, and price targets.</p>
      
      <h3>Key Fibonacci Levels</h3>
      <ul>
        <li><strong>23.6%</strong> - Shallow retracement</li>
        <li><strong>38.2%</strong> - Moderate retracement</li>
        <li><strong>50%</strong> - Halfway point (not a true Fib level)</li>
        <li><strong>61.8%</strong> - The "golden ratio" - strong level</li>
        <li><strong>78.6%</strong> - Deep retracement</li>
      </ul>
      
      <h3>How to Use</h3>
      <ol>
        <li>Identify a significant high and low</li>
        <li>Draw Fibonacci from low to high (uptrend) or high to low (downtrend)</li>
        <li>Watch for price reactions at Fib levels</li>
      </ol>
      
      <h3>Fibonacci Extensions</h3>
      <p>Used to project profit targets beyond the original move. Common levels: 127.2%, 161.8%, 261.8%.</p>
    `,
    quizQuestions: [
      {
        question: "Which is the most important Fibonacci retracement level?",
        options: ["23.6%", "38.2%", "61.8%", "100%"],
        correctAnswer: 2,
        explanation: "The 61.8% level, known as the golden ratio, is considered the most significant Fibonacci retracement level."
      },
      {
        question: "What are Fibonacci extensions used for?",
        options: ["Finding entry points", "Setting stop losses", "Projecting profit targets", "Measuring volume"],
        correctAnswer: 2,
        explanation: "Fibonacci extensions project potential price targets beyond the original swing high or low."
      }
    ]
  },
  'options-basics': {
    content: `
      <h2>Options Trading Basics</h2>
      <p>Options give you the right (but not obligation) to buy or sell a stock at a specific price by a certain date.</p>
      
      <h3>Call Options</h3>
      <p>Right to <strong>buy</strong> at the strike price. Profit when stock goes UP.</p>
      
      <h3>Put Options</h3>
      <p>Right to <strong>sell</strong> at the strike price. Profit when stock goes DOWN.</p>
      
      <h3>Key Terms</h3>
      <ul>
        <li><strong>Strike Price:</strong> The price at which you can buy/sell</li>
        <li><strong>Expiration:</strong> When the option expires</li>
        <li><strong>Premium:</strong> The price you pay for the option</li>
        <li><strong>In the Money (ITM):</strong> Option has intrinsic value</li>
        <li><strong>Out of the Money (OTM):</strong> Option has no intrinsic value</li>
      </ul>
      
      <h3>Warning</h3>
      <p>Options can expire worthless. Only trade with money you can afford to lose. Start with paper trading!</p>
    `,
    quizQuestions: [
      {
        question: "What does a call option give you the right to do?",
        options: ["Sell at the strike price", "Buy at the strike price", "Short the stock", "Collect dividends"],
        correctAnswer: 1,
        explanation: "A call option gives you the right to buy the underlying stock at the strike price before expiration."
      },
      {
        question: "What happens if an option expires 'out of the money'?",
        options: ["You get your premium back", "It becomes worthless", "It converts to stock", "It rolls over"],
        correctAnswer: 1,
        explanation: "Options that expire out of the money expire worthless, and you lose the premium you paid."
      }
    ]
  },
  'risk-reward-advanced': {
    content: `
      <h2>Advanced Risk-Reward Strategies</h2>
      <p>Professional traders focus on risk-adjusted returns, not just profits.</p>
      
      <h3>Position Sizing</h3>
      <p>Calculate your position size based on your risk tolerance and stop loss distance:</p>
      <p><strong>Position Size = Account Risk / (Entry - Stop Loss)</strong></p>
      
      <h3>Kelly Criterion</h3>
      <p>A formula to determine optimal bet size based on your win rate and payoff ratio.</p>
      
      <h3>Portfolio Heat</h3>
      <p>Total risk across all open positions. Keep it below 6% of your portfolio.</p>
      
      <h3>Expectancy</h3>
      <p><strong>(Win Rate × Average Win) - (Loss Rate × Average Loss)</strong></p>
      <p>Positive expectancy = profitable system over time.</p>
      
      <h3>Risk of Ruin</h3>
      <p>The probability of losing enough to stop trading. Lower your risk per trade to reduce this.</p>
    `,
    quizQuestions: [
      {
        question: "What is portfolio heat?",
        options: ["Temperature of the market", "Total risk across all positions", "Daily profit/loss", "A type of order"],
        correctAnswer: 1,
        explanation: "Portfolio heat is the total percentage of your account at risk across all open positions."
      },
      {
        question: "What does positive expectancy mean?",
        options: ["You expect to win every trade", "The system is profitable over time", "Markets will go up", "Risk is eliminated"],
        correctAnswer: 1,
        explanation: "Positive expectancy means your trading system will be profitable over a large number of trades."
      }
    ]
  },
  'building-trading-plan': {
    content: `
      <h2>Building Your Trading Plan</h2>
      <p>A trading plan is your roadmap to consistent profitability.</p>
      
      <h3>Essential Components</h3>
      <ul>
        <li><strong>Market Selection:</strong> What will you trade?</li>
        <li><strong>Timeframe:</strong> Day trading, swing, or position?</li>
        <li><strong>Strategy:</strong> How do you find trades?</li>
        <li><strong>Entry Rules:</strong> When exactly do you enter?</li>
        <li><strong>Exit Rules:</strong> Take profit and stop loss levels</li>
        <li><strong>Position Sizing:</strong> How much per trade?</li>
      </ul>
      
      <h3>Trading Journal</h3>
      <p>Record every trade with:</p>
      <ul>
        <li>Entry/exit points and reasoning</li>
        <li>Emotions before, during, after</li>
        <li>What you learned</li>
        <li>Screenshots of charts</li>
      </ul>
      
      <h3>Review and Improve</h3>
      <p>Weekly review your trades. Look for patterns in your winners and losers. Continuously refine your plan.</p>
    `,
    quizQuestions: [
      {
        question: "What is the main purpose of a trading plan?",
        options: ["To eliminate all losses", "To provide consistent rules and structure", "To predict the market", "To impress other traders"],
        correctAnswer: 1,
        explanation: "A trading plan provides consistent rules and structure to remove emotional decision-making from trading."
      },
      {
        question: "Why is a trading journal important?",
        options: ["For tax purposes only", "To learn from past trades and improve", "To share with friends", "It's not important"],
        correctAnswer: 1,
        explanation: "A trading journal helps you identify patterns in your behavior and continuously improve your trading."
      }
    ]
  }
};

// Map lesson titles from database to content keys
export const lessonContentMap: Record<string, string> = {
  // Beginner
  'What is the Stock Market?': 'what-is-a-stock',
  'What is a Stock?': 'what-is-a-stock',
  'Understanding Stock Prices': 'how-stock-market-works',
  'How the Stock Market Works': 'how-stock-market-works',
  'Types of Stocks': 'reading-stock-quotes',
  'Reading Stock Quotes': 'reading-stock-quotes',
  'Types of Orders': 'types-of-orders',
  'Your First Investment': 'types-of-orders',
  'Risk Management Basics': 'risk-management-basics',
  // Intermediate
  'Technical Analysis Basics': 'technical-analysis-intro',
  'Technical Analysis Intro': 'technical-analysis-intro',
  'Support and Resistance': 'support-resistance',
  'Candlestick Patterns': 'candlestick-patterns',
  'Moving Averages': 'moving-averages',
  'Volume Analysis': 'volume-analysis',
  'Risk Management': 'risk-management-basics',
  // Advanced
  'Chart Patterns': 'advanced-chart-patterns',
  'Advanced Chart Patterns': 'advanced-chart-patterns',
  'Fibonacci Trading': 'fibonacci-trading',
  'Options Basics': 'options-basics',
  'Options Trading': 'options-basics',
  'Advanced Risk-Reward': 'risk-reward-advanced',
  'Building a Trading Plan': 'building-trading-plan',
  'Building a Trading Strategy': 'building-trading-plan',
  'Market Psychology': 'trading-psychology',
};

// Default content for lessons without specific content
export const defaultLessonContent = {
  content: `
    <h2>Lesson Content</h2>
    <p>This lesson content is being prepared. Check back soon for comprehensive learning material!</p>
    <h3>Key Points</h3>
    <ul>
      <li>Understanding core concepts</li>
      <li>Practical applications</li>
      <li>Real-world examples</li>
    </ul>
  `,
  quizQuestions: []
};
