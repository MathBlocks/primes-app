import { FC } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 65ch;
  margin: 0 auto;

  p {
    line-height: 1.5rem;
  }
  .center {
    margin-left: auto;
    margin-right: auto;
  }
  .align-center {
    text-align: center;
  }
`

export const WLTest: FC = () => (
  <Container>
    <h1>Primes Whitelist Test</h1>
    <p>
      The Primes Whitelist test took place between Dec 3-5 2021, and
      consisted of 8 questions with varying difficulties. You can
      view the questions{' '}
      <a href="https://docs.google.com/forms/d/e/1FAIpQLScSHMRSWiFyvFJjX0GIo-R0wpKVCu1DRqX_Of3d8hgQnQY7Ng/viewform?usp=sf_link">
        on Google Forms
      </a>
      .
    </p>
    <p>Around 110 people submitted results. Here are the grades they got:</p>
    <table className="center">
      <thead>
        <tr>
          <th>Discord User</th>
          <th className="align-center">Grade</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>nullptr#7754</td>
          <td className="align-center">619</td>
        </tr>
        <tr>
          <td>IAmAlpaca#4051</td>
          <td className="align-center">619</td>
        </tr>
        <tr>
          <td>steinerkadabra#8615</td>
          <td className="align-center">614</td>
        </tr>
        <tr>
          <td>Ezuti#1196</td>
          <td className="align-center">576</td>
        </tr>
        <tr>
          <td>Appt Pupil#7382</td>
          <td className="align-center">199</td>
        </tr>
        <tr>
          <td>Jaja#1079</td>
          <td className="align-center">199</td>
        </tr>
        <tr>
          <td>pk#6564</td>
          <td className="align-center">199</td>
        </tr>
        <tr>
          <td>_lost#2607</td>
          <td className="align-center">199</td>
        </tr>
        <tr>
          <td>CryptoHenry#7941</td>
          <td className="align-center">199</td>
        </tr>
        <tr>
          <td>Eltiburonito#0993</td>
          <td className="align-center">199</td>
        </tr>
        <tr>
          <td>mapl3sn0w#7873</td>
          <td className="align-center">199</td>
        </tr>
        <tr>
          <td>CryptoKoala#9423</td>
          <td className="align-center">199</td>
        </tr>
        <tr>
          <td>Donnie Degen#8281</td>
          <td className="align-center">199</td>
        </tr>
        <tr>
          <td>Hamlet#4053</td>
          <td className="align-center">199</td>
        </tr>
        <tr>
          <td>vsk275#2472</td>
          <td className="align-center">199</td>
        </tr>
        <tr>
          <td>teawaterwire (theo)#9064</td>
          <td className="align-center">197</td>
        </tr>
        <tr>
          <td>thisisanameforsure#5293</td>
          <td className="align-center">194</td>
        </tr>
        <tr>
          <td>cxkoda#5330</td>
          <td className="align-center">194</td>
        </tr>
        <tr>
          <td>matthieu#6627</td>
          <td className="align-center">194</td>
        </tr>
        <tr>
          <td>Ignoramus#9226</td>
          <td className="align-center">189</td>
        </tr>
        <tr>
          <td>uk#4238</td>
          <td className="align-center">189</td>
        </tr>
        <tr>
          <td>maffs#1206</td>
          <td className="align-center">189</td>
        </tr>
        <tr>
          <td>Gokulanath#4147</td>
          <td className="align-center">184</td>
        </tr>
        <tr>
          <td>mingbip#2944</td>
          <td className="align-center">184</td>
        </tr>
        <tr>
          <td>Harchy33#4681</td>
          <td className="align-center">184</td>
        </tr>
        <tr>
          <td>Anistuffs#7315</td>
          <td className="align-center">179</td>
        </tr>
        <tr>
          <td>cain#3041</td>
          <td className="align-center">179</td>
        </tr>
        <tr>
          <td>steppered#5847</td>
          <td className="align-center">176</td>
        </tr>
        <tr>
          <td>cnhkp.eth#0012</td>
          <td className="align-center">164</td>
        </tr>
        <tr>
          <td>Laxsuperrich#9203</td>
          <td className="align-center">164</td>
        </tr>
        <tr>
          <td>EL.painting#2997</td>
          <td className="align-center">162</td>
        </tr>
        <tr>
          <td>𝙐𝙣 𝘼𝙬𝙚𝙤𝙣𝙖𝙤#1246</td>
          <td className="align-center">162</td>
        </tr>
        <tr>
          <td>grassfields#4653</td>
          <td className="align-center">159</td>
        </tr>
        <tr>
          <td>MaJaKz#0001</td>
          <td className="align-center">159</td>
        </tr>
        <tr>
          <td>Tommy#1340</td>
          <td className="align-center">155</td>
        </tr>
        <tr>
          <td>Levissie#6747</td>
          <td className="align-center">154</td>
        </tr>
        <tr>
          <td>Kαiser#3422</td>
          <td className="align-center">154</td>
        </tr>
        <tr>
          <td>CoinyeWest#9095</td>
          <td className="align-center">151</td>
        </tr>
        <tr>
          <td>Draxun#4783</td>
          <td className="align-center">150</td>
        </tr>
        <tr>
          <td>cryptohuntz#4459</td>
          <td className="align-center">149</td>
        </tr>
        <tr>
          <td>Coelacanth#1891</td>
          <td className="align-center">149</td>
        </tr>
        <tr>
          <td>prmn#4126</td>
          <td className="align-center">141</td>
        </tr>
        <tr>
          <td>noxeW#2730</td>
          <td className="align-center">139</td>
        </tr>
        <tr>
          <td>Jhes#6756</td>
          <td className="align-center">130</td>
        </tr>
        <tr>
          <td>EmptyTease#6956</td>
          <td className="align-center">128</td>
        </tr>
        <tr>
          <td>Tol#7179</td>
          <td className="align-center">126</td>
        </tr>
        <tr>
          <td>kkiitaeee#5640</td>
          <td className="align-center">125</td>
        </tr>
        <tr>
          <td>Rphad.eth#7901</td>
          <td className="align-center">124</td>
        </tr>
        <tr>
          <td>GueRakun#0159</td>
          <td className="align-center">123</td>
        </tr>
        <tr>
          <td>UFvOgue#8392</td>
          <td className="align-center">117</td>
        </tr>
        <tr>
          <td>Emerim#6338</td>
          <td className="align-center">108</td>
        </tr>
        <tr>
          <td>dimkyl#0073</td>
          <td className="align-center">105</td>
        </tr>
        <tr>
          <td>tkwek#1251</td>
          <td className="align-center">101</td>
        </tr>
        <tr>
          <td>Palazz #0776</td>
          <td className="align-center">100</td>
        </tr>
        <tr>
          <td>Monsieur...#3949</td>
          <td className="align-center">100</td>
        </tr>
        <tr>
          <td>Sarpi#9457</td>
          <td className="align-center">99</td>
        </tr>
        <tr>
          <td>Touta#8989</td>
          <td className="align-center">97</td>
        </tr>
        <tr>
          <td>HAMP#4983</td>
          <td className="align-center">96</td>
        </tr>
        <tr>
          <td>manimechian#6432</td>
          <td className="align-center">95</td>
        </tr>
        <tr>
          <td>ICHI#5330</td>
          <td className="align-center">92</td>
        </tr>
        <tr>
          <td>Pelago#6901</td>
          <td className="align-center">92</td>
        </tr>
        <tr>
          <td>ikinari#2891</td>
          <td className="align-center">89.5</td>
        </tr>
        <tr>
          <td>0x_Saitama#5490</td>
          <td className="align-center">89.5</td>
        </tr>
        <tr>
          <td>i2eDeFiNe#9224</td>
          <td className="align-center">89</td>
        </tr>
        <tr>
          <td>Sandmann#2264</td>
          <td className="align-center">87</td>
        </tr>
        <tr>
          <td>GS4ever#9160</td>
          <td className="align-center">87</td>
        </tr>
        <tr>
          <td>xalofin76#5588</td>
          <td className="align-center">86</td>
        </tr>
        <tr>
          <td>meister#2135</td>
          <td className="align-center">85</td>
        </tr>
        <tr>
          <td>kaanu#6866</td>
          <td className="align-center">84</td>
        </tr>
        <tr>
          <td>Adoull12#7616</td>
          <td className="align-center">83</td>
        </tr>
        <tr>
          <td>boombatz#0569</td>
          <td className="align-center">79</td>
        </tr>
        <tr>
          <td>azin#2414</td>
          <td className="align-center">79</td>
        </tr>
        <tr>
          <td>nae#2703</td>
          <td className="align-center">78</td>
        </tr>
        <tr>
          <td>Helium#4321</td>
          <td className="align-center">78</td>
        </tr>
        <tr>
          <td>CEO#2006</td>
          <td className="align-center">70</td>
        </tr>
        <tr>
          <td>gleuch#0001</td>
          <td className="align-center">69</td>
        </tr>
        <tr>
          <td>Bowsie#0001</td>
          <td className="align-center">69</td>
        </tr>
        <tr>
          <td>Violet#1417</td>
          <td className="align-center">69</td>
        </tr>
        <tr>
          <td>jasper#9782</td>
          <td className="align-center">69</td>
        </tr>
        <tr>
          <td>tosin#9661</td>
          <td className="align-center">66</td>
        </tr>
        <tr>
          <td>Senzzen/Baptiste#3178</td>
          <td className="align-center">60</td>
        </tr>
        <tr>
          <td>gvidaurrazaga#0682</td>
          <td className="align-center">60</td>
        </tr>
        <tr>
          <td>vuenxc#0793</td>
          <td className="align-center">56</td>
        </tr>
        <tr>
          <td>askas#3965</td>
          <td className="align-center">52</td>
        </tr>
        <tr>
          <td>liray-unendlich | phore.io#7929</td>
          <td className="align-center">52</td>
        </tr>
        <tr>
          <td>ChicagoSpartan#1381</td>
          <td className="align-center">52</td>
        </tr>
        <tr>
          <td>Coutience (🧬,👽,🦋)#0826</td>
          <td className="align-center">51</td>
        </tr>
        <tr>
          <td>demystified#5759</td>
          <td className="align-center">50</td>
        </tr>
        <tr>
          <td>s.j.r#4026</td>
          <td className="align-center">49</td>
        </tr>
        <tr>
          <td>katies#6986</td>
          <td className="align-center">41</td>
        </tr>
        <tr>
          <td>denim#3619</td>
          <td className="align-center">41</td>
        </tr>
        <tr>
          <td>rayanridouard#7674</td>
          <td className="align-center">41</td>
        </tr>
        <tr>
          <td>Satgay#4382</td>
          <td className="align-center">40</td>
        </tr>
        <tr>
          <td>vas#2983</td>
          <td className="align-center">39</td>
        </tr>
        <tr>
          <td>con322#8597</td>
          <td className="align-center">39</td>
        </tr>
        <tr>
          <td>pervertmoney</td>
          <td className="align-center">36</td>
        </tr>
        <tr>
          <td>G1ft F0x#8800</td>
          <td className="align-center">35</td>
        </tr>
        <tr>
          <td>Shyruki#8618</td>
          <td className="align-center">35</td>
        </tr>
        <tr>
          <td>bozkuurtburak#2558</td>
          <td className="align-center">31</td>
        </tr>
        <tr>
          <td>0x (█, ☀, 3)#0825</td>
          <td className="align-center">31</td>
        </tr>
        <tr>
          <td>Jrp94#2125</td>
          <td className="align-center">31</td>
        </tr>
        <tr>
          <td>black attack#2812</td>
          <td className="align-center">31</td>
        </tr>
        <tr>
          <td>chrisinri#1418</td>
          <td className="align-center">31</td>
        </tr>
        <tr>
          <td>demiculus#9999</td>
          <td className="align-center">31</td>
        </tr>
        <tr>
          <td>spi#2289</td>
          <td className="align-center">31</td>
        </tr>
        <tr>
          <td>KRATOS#6428</td>
          <td className="align-center">20</td>
        </tr>
        <tr>
          <td>snek#4626</td>
          <td className="align-center">15</td>
        </tr>
        <tr>
          <td>mogwai#6961</td>
          <td className="align-center">15</td>
        </tr>
        <tr>
          <td>victormlr#6542</td>
          <td className="align-center">10</td>
        </tr>
        <tr>
          <td>yoshimo#3447</td>
          <td className="align-center">10</td>
        </tr>
        <tr>
          <td>DRock#6019</td>
          <td className="align-center">5</td>
        </tr>
        <tr>
          <td>janmeza#0674</td>
          <td className="align-center">5</td>
        </tr>
      </tbody>
    </table>
  </Container>
)
