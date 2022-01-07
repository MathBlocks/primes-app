import { FC, ReactNode } from 'react'

import { Attributes } from '../attributes'

export const Icon: FC<{
  attribute: keyof Attributes
  prime: boolean
  width: number
  height: number
  x: number
  y: number
}> = ({ attribute, prime, x, y, width, height }) => {
  const fill = prime ? '#000' : '#fff'

  let content: ReactNode = <g />

  switch (attribute) {
    case 'unit':
      content = (
        <path d="M30 -0.5C30.7438 -0.5 31.4455 -0.319534 32.0636 5.36442e-07L44 0C46.2091 -8.9407e-08 48 1.79086 48 4C48 6.20914 46.2091 8 44 8H34.5V52H44C46.2091 52 48 53.7909 48 56C48 58.2091 46.2091 60 44 60H32.0636C31.4455 60.3195 30.7438 60.5 30 60.5C29.2562 60.5 28.5545 60.3195 27.9364 60H17C14.7909 60 13 58.2091 13 56C13 53.7909 14.7909 52 17 52H25.5V8H17C14.7909 8 13 6.20914 13 4C13 1.79086 14.7909 1.2517e-06 17 1.19209e-06L27.9364 7.15256e-07C28.5545 -0.319534 29.2562 -0.5 30 -0.5Z" />
      )
      break
    case 'taxicabNumber':
      content = (
        <>
          <rect y="45" width="15" height="15" rx="2" />
          <rect x="15" y="30" width="15" height="15" rx="2" />
          <rect x="30" y="15" width="15" height="15" rx="2" />
          <path d="M45 2C45 0.89543 45.8954 0 47 0H58C59.1046 0 60 0.895431 60 2V13C60 14.1046 59.1046 15 58 15H47C45.8954 15 45 14.1046 45 13V2Z" />
          <path d="M45 32C45 30.8954 45.8954 30 47 30H58C59.1046 30 60 30.8954 60 32V43C60 44.1046 59.1046 45 58 45H47C45.8954 45 45 44.1046 45 43V32Z" />
          <path d="M30 47C30 45.8954 30.8954 45 32 45H43C44.1046 45 45 45.8954 45 47V58C45 59.1046 44.1046 60 43 60H32C30.8954 60 30 59.1046 30 58V47Z" />
          <path d="M0 17C0 15.8954 0.895431 15 2 15H13C14.1046 15 15 15.8954 15 17V28C15 29.1046 14.1046 30 13 30H2C0.89543 30 0 29.1046 0 28V17Z" />
          <path d="M15 2C15 0.89543 15.8954 0 17 0H28C29.1046 0 30 0.895431 30 2V13C30 14.1046 29.1046 15 28 15H17C15.8954 15 15 14.1046 15 13V2Z" />
        </>
      )
      break
    case 'perfectNumber':
      content = (
        <g className="stroke">
          <path d="M12 12L49 49" />
          <path d="M12 49L49 12" />
          <path d="M5.41406 30H55.9999" />
          <path d="M30.707 55.2929V4.70711" />
        </g>
      )
      break
    case 'eulersLuckyNumbers':
      content = (
        <path d="M30.84 7.264C20.832 7.264 15.36 13.204 14.424 25.084C14.424 25.66 14.748 25.948 15.396 25.948H44.448C45.024 25.948 45.312 25.66 45.312 25.084C44.88 13.204 40.056 7.264 30.84 7.264ZM33.108 59.32C24.252 59.32 17.52 56.908 12.912 52.084C8.304 47.188 6 39.88 6 30.16C6 20.152 8.196 12.808 12.588 8.12801C17.052 3.37601 23.136 1 30.84 1C45.024 1 52.548 9.388 53.412 26.164C53.484 27.892 52.872 29.368 51.576 30.592C50.352 31.744 48.876 32.32 47.148 32.32H15.18C14.604 32.32 14.316 32.644 14.316 33.292C14.964 46.468 21.48 53.056 33.864 53.056C37.968 53.056 42.18 52.3 46.5 50.788C47.292 50.5 48.048 50.608 48.768 51.112C49.488 51.544 49.848 52.192 49.848 53.056C49.848 55.504 48.732 57.016 46.5 57.592C41.892 58.744 37.428 59.32 33.108 59.32Z" />
      )
      break
    case 'uniquePrimeNumber':
      content = (
        <circle
          cx="30"
          cy="30"
          r="20"
          stroke="#000"
          strokeWidth="20"
        />
      )
      break
    case 'friendlyNumber':
      content = (
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60ZM17.5 31C21.0899 31 24 26.7467 24 21.5C24 16.2533 21.0899 12 17.5 12C13.9101 12 11 16.2533 11 21.5C11 26.7467 13.9101 31 17.5 31ZM49 21.5C49 26.7467 46.0899 31 42.5 31C38.9101 31 36 26.7467 36 21.5C36 16.2533 38.9101 12 42.5 12C46.0899 12 49 16.2533 49 21.5ZM46.2319 43.3569C47.5336 41.5719 47.1418 39.0698 45.3569 37.7681C43.5719 36.4665 41.0698 36.8582 39.7681 38.6432C34.6551 45.6546 24.5805 45.9194 19.223 38.6309C17.9145 36.8509 15.4109 36.4687 13.6309 37.7771C11.8509 39.0855 11.4687 41.5892 12.7771 43.3691C21.4195 55.1263 38.0116 54.6293 46.2319 43.3569Z"
        />
      )
      break
    case 'colossallyAbundantNumber':
      content = (
        <path d="M34 4C34 1.79086 32.2091 0 30 0C27.7909 0 26 1.79086 26 4V26H4C1.79086 26 0 27.7909 0 30C0 32.2091 1.79086 34 4 34H26V56C26 58.2091 27.7909 60 30 60C32.2091 60 34 58.2091 34 56V34H56C58.2091 34 60 32.2091 60 30C60 27.7909 58.2091 26 56 26H34V4Z" />
      )
      break

    case 'fibonacciNumber':
      content = (
        <path
          className="stroke"
          d="M31.334 23.0673C31.346 22.9968 31.3448 22.9214 31.3282 22.8467C31.3115 22.7721 31.2796 22.6979 31.233 22.6309C31.1864 22.5638 31.1246 22.5037 31.0514 22.4568C30.9782 22.4098 30.8926 22.3758 30.8011 22.3597C30.7095 22.3436 30.6113 22.3454 30.5142 22.3674C30.4172 22.3894 30.3206 22.4318 30.2333 22.4937C30.1461 22.5555 30.0681 22.6376 30.007 22.735C29.946 22.8324 29.9017 22.9457 29.8808 23.0673C29.8599 23.1889 29.8621 23.3194 29.8908 23.4482C29.9194 23.5771 29.9744 23.7053 30.055 23.8211C30.1356 23.9368 30.2421 24.0406 30.3688 24.1218C30.4955 24.2031 30.643 24.2615 30.8011 24.2894C30.9592 24.3173 31.1289 24.3141 31.2966 24.2762C31.4643 24.2383 31.631 24.165 31.7815 24.0579C31.9321 23.9508 32.0672 23.8095 32.1726 23.6412C32.2781 23.473 32.3544 23.2773 32.3906 23.0673C32.4267 22.8573 32.4228 22.6319 32.3734 22.4093C32.324 22.1867 32.2289 21.9653 32.0896 21.7653C31.9504 21.5654 31.7664 21.3861 31.5478 21.2459C31.3292 21.1058 31.0742 21.0046 30.8011 20.9566C30.5279 20.9086 30.2349 20.9138 29.9451 20.9793C29.6553 21.0448 29.3676 21.1714 29.1077 21.3563C28.8477 21.5411 28.6144 21.7854 28.4321 22.0758C28.2498 22.3661 28.1181 22.7045 28.0556 23.0673C27.993 23.4301 28 23.8192 28.0852 24.204C28.1704 24.5887 28.3351 24.9707 28.5756 25.3158C28.8162 25.661 29.1337 25.9711 29.5115 26.2129C29.8892 26.4548 30.3292 26.6299 30.8011 26.7129C31.2729 26.7959 31.7791 26.7869 32.2794 26.6736C32.7798 26.5603 33.2769 26.3418 33.7259 26.0225C34.175 25.7032 34.5779 25.2814 34.8928 24.7796C35.2076 24.2779 35.4351 23.6939 35.543 23.0673C35.6508 22.4406 35.6391 21.7686 35.4917 21.1042C35.3442 20.4398 35.0603 19.7797 34.645 19.1834C34.2297 18.5871 33.681 18.0519 33.0284 17.6341C32.3758 17.2162 31.616 16.9139 30.8011 16.7706C29.9861 16.6273 29.112 16.6429 28.2476 16.8387C27.3832 17.0345 26.5249 17.4116 25.7493 17.9631C24.9738 18.5145 24.2777 19.243 23.7341 20.1096C23.1906 20.9762 22.7972 21.985 22.611 23.0673C22.4248 24.1496 22.4449 25.3103 22.6995 26.4579C22.9541 27.6055 23.4448 28.7455 24.1619 29.7754C24.879 30.8054 25.8268 31.7296 26.9541 32.4514C28.0813 33.1731 29.3935 33.6953 30.8011 33.9427C32.2086 34.1901 33.7186 34.1632 35.2113 33.8252C36.7041 33.4872 38.1868 32.8355 39.5263 31.8831C40.8658 30.9308 42.0683 29.6723 43.007 28.1756C43.9458 26.679 44.625 24.9364 44.9468 23.0673C45.2687 21.1981 45.2337 19.1931 44.7941 17.211C44.3544 15.2289 43.5067 13.2599 42.268 11.4812C41.0293 9.70248 39.3924 8.10584 37.4457 6.85915C35.4991 5.61247 33.2323 4.71072 30.8011 4.28349C28.3699 3.85626 25.762 3.90252 23.1837 4.48636C20.6054 5.0702 18.0447 6.19579 15.7309 7.8406C13.4172 9.4854 11.3406 11.6591 9.71901 14.2442C8.09746 16.8292 6.92464 19.839 6.36874 23.0673C5.81285 26.2956 5.87338 29.7586 6.6328 33.1821C7.39222 36.6057 8.8562 40.0062 10.9956 43.0785C13.135 46.1509 15.9624 48.9083 19.3247 51.0616C22.687 53.2149 26.6019 54.7723 30.8011 55.5104C35.0003 56.2484 39.5045 56.1682 43.9576 55.1599C47.4609 54.3667 50.9455 52.9942 54.2183 51.0616"
        />
      )
      break
    case 'repdigit':
      content = (
        <g className="stroke">
          <path
            d="M43.9238 20.8241H57.7988V6.94905"
            strokeWidth="4.625"
          />
          <path
            d="M12.0127 11.013C14.3748 8.65088 17.179 6.77717 20.2652 5.49882C23.3514 4.22046 26.6592 3.5625 29.9997 3.5625C33.3402 3.5625 36.648 4.22046 39.7342 5.49882C42.8205 6.77717 45.6247 8.65088 47.9868 11.013L57.7979 20.8241"
            strokeWidth="4.625"
          />
          <path
            d="M16.0762 37.1759H2.20117V51.0509"
            strokeWidth="4.625"
          />
          <path
            d="M47.9873 46.9871C45.6252 49.3491 42.821 51.2229 39.7348 52.5012C36.6486 53.7796 33.3408 54.4375 30.0003 54.4375C26.6598 54.4375 23.352 53.7796 20.2658 52.5012C17.1796 51.2229 14.3753 49.3491 12.0133 46.9871L2.20215 37.1759"
            strokeWidth="4.625"
          />
        </g>
      )
      break
    case 'weirdNumber':
      content = (
        <path d="M28.8301 41.5859C27.0279 41.5859 25.5425 40.1034 25.7606 38.3145C25.9194 37.0114 26.1659 35.8987 26.5 34.9766C27.0859 33.3594 28.2812 31.5664 30.0859 29.5977L34.6914 24.8516C36.6602 22.625 37.6445 20.2344 37.6445 17.6797C37.6445 15.2188 37 13.2969 35.7109 11.9141C34.4219 10.5078 32.5469 9.80469 30.0859 9.80469C27.6953 9.80469 25.7734 10.4375 24.3203 11.7031C23.6691 12.2703 23.1638 12.9246 22.8044 13.666C22.0258 15.2721 20.6937 16.8008 18.9087 16.8008V16.8008C17.1082 16.8008 15.6012 15.3075 16.0357 13.5602C16.6171 11.2224 17.8318 9.24397 19.6797 7.625C22.3516 5.28125 25.8203 4.10938 30.0859 4.10938C34.5156 4.10938 37.9609 5.30469 40.4219 7.69531C42.9062 10.0625 44.1484 13.3203 44.1484 17.4688C44.1484 21.5703 42.25 25.6133 38.4531 29.5977L34.6211 33.3945C33.4661 34.6761 32.701 36.3368 32.3257 38.3767C32.0034 40.1282 30.611 41.5859 28.8301 41.5859V41.5859ZM25.2695 52.7305C25.2695 51.6758 25.5859 50.7969 26.2188 50.0938C26.875 49.3672 27.8359 49.0039 29.1016 49.0039C30.3672 49.0039 31.3281 49.3672 31.9844 50.0938C32.6406 50.7969 32.9688 51.6758 32.9688 52.7305C32.9688 53.7852 32.6406 54.6641 31.9844 55.3672C31.3281 56.0469 30.3672 56.3867 29.1016 56.3867C27.8359 56.3867 26.875 56.0469 26.2188 55.3672C25.5859 54.6641 25.2695 53.7852 25.2695 52.7305Z" />
      )
      break
    case 'triangularNumber':
      content = (
        <path d="M1.9125 50.94L28.304 8.71359C29.0873 7.46026 30.9127 7.46026 31.696 8.71359L58.0875 50.94C58.9201 52.2721 57.9624 54 56.3915 54H3.6085C2.03762 54 1.07994 52.2721 1.9125 50.94Z" />
      )
      break
    case 'sophieGermainPrime':
      content = (
        <>
          <g transform="translate(0, 9.5)">
            <path d="M11.5728 22.6867C7.48192 21.2653 4.52145 19.5707 2.69134 17.6027C0.897112 15.5982 0 13.1929 0 10.3867C0 7.17956 1.00477 4.64667 3.0143 2.788C5.02383 0.929334 7.78694 0 11.3036 0C14.605 0 17.5116 0.400888 20.0235 1.20266C20.7771 1.45778 21.3872 1.94978 21.8537 2.67866C22.356 3.37111 22.6072 4.15467 22.6072 5.02933C22.6072 5.64889 22.3381 6.12266 21.7998 6.45066C21.2616 6.77866 20.7054 6.81511 20.1312 6.56C17.404 5.39378 14.6409 4.81067 11.8419 4.81067C9.90412 4.81067 8.41491 5.30267 7.37426 6.28667C6.33361 7.27067 5.81329 8.63733 5.81329 10.3867C5.81329 11.808 6.29773 13.1018 7.26661 14.268C8.23549 15.3978 9.67087 16.2907 11.5728 16.9467C16.3095 18.5502 19.5929 20.336 21.423 22.304C23.289 24.272 24.222 26.7684 24.222 29.7933C24.222 33.4742 23.1096 36.2622 20.8848 38.1573C18.6599 40.0524 15.3765 41 11.0345 41C8.19961 41 5.63387 40.5627 3.33726 39.688C1.65069 38.9956 0.807401 37.6471 0.807401 35.6427C0.807401 35.0231 1.07653 34.5676 1.6148 34.276C2.15307 33.9844 2.69134 33.9844 3.2296 34.276C5.45444 35.4787 7.87665 36.08 10.4962 36.08C15.6995 36.08 18.3011 33.9844 18.3011 29.7933C18.3011 28.1898 17.7808 26.8231 16.7401 25.6933C15.7354 24.5636 14.0129 23.5613 11.5728 22.6867Z" />
            <path d="M47.6198 41C42.0936 41 37.5722 39.1413 34.0555 35.424C30.5388 31.7067 28.7805 26.732 28.7805 20.5C28.7805 14.1587 30.5568 9.16578 34.1093 5.52133C37.6619 1.84044 42.5242 0 48.6964 0C51.2083 0 53.5228 0.182222 55.64 0.546666C56.3577 0.692444 56.9498 1.05689 57.4163 1.64C57.8828 2.22311 58.1161 2.89733 58.1161 3.66267C58.1161 4.28222 57.8649 4.79244 57.3625 5.19333C56.8601 5.55778 56.3039 5.66711 55.6939 5.52133C53.792 5.04756 51.6389 4.81067 49.2347 4.81067C44.6056 4.81067 41.035 6.15911 38.5231 8.856C36.0471 11.5164 34.8091 15.3978 34.8091 20.5C34.8091 25.3836 36.0292 29.2284 38.4693 32.0347C40.9094 34.8044 44.139 36.1893 48.1581 36.1893C50.1676 36.1893 52.1054 35.8978 53.9714 35.3147C54.2226 35.2782 54.3482 35.096 54.3482 34.768V22.0307C54.3482 21.7027 54.1867 21.5387 53.8637 21.5387H45.09C44.4441 21.5387 43.8879 21.32 43.4214 20.8827C42.9907 20.4089 42.7754 19.844 42.7754 19.188C42.7754 18.532 42.9907 17.9853 43.4214 17.548C43.8879 17.0742 44.4441 16.8373 45.09 16.8373H56.9319C57.7572 16.8373 58.4749 17.1471 59.0849 17.7667C59.695 18.3862 60 19.1151 60 19.9533V35.424C60 36.3716 59.7309 37.2462 59.1926 38.048C58.6902 38.8133 58.0084 39.3418 57.1472 39.6333C54.3482 40.5444 51.1724 41 47.6198 41Z" />
          </g>
        </>
      )
      break
    case 'strongPrime':
      content = (
        <g className="stroke">
          <path d="M4 28L56 28" />
          <path d="M16 40L16 15" />
          <path d="M10 34L10 21" />
          <path d="M43.6465 40.04L43.6465 15" />
          <path d="M49.9062 34.8233L49.9062 20.2167" />
        </g>
      )
      break
    case 'frugalNumber':
      content = (
        <g>
          <circle cx="8" cy="29" r="8" />
          <circle cx="30" cy="29" r="8" />
          <circle cx="52" cy="29" r="8" />
        </g>
      )
      break
    case 'squareNumber':
      content = <rect width="60" height="60" rx="2" />
      break
    case 'emirp':
      content = (
        <path d="M14.8094 27.7372L36.2227 11.6025C37.2258 10.8467 37.8156 9.66372 37.8156 8.40783V3.8668C37.8156 2.2137 35.924 1.27431 34.6069 2.27334L2.27412 26.7987C2.08736 26.9404 1.88265 27.0793 1.67499 27.2202C0.837331 27.7886 -0.048078 28.3894 0.0050412 29.3335C0.0411327 29.975 0.271129 30.6693 0.698678 31.0356L34.5143 59.0107C35.8117 60.1224 37.8156 59.2005 37.8156 57.492V52.3667C37.8156 51.1941 37.3011 50.0806 36.4082 49.3206L14.7166 30.8575C13.7415 30.0276 13.7867 28.5078 14.8094 27.7372ZM59.8157 4.86679V57.492C59.8157 59.2005 57.8118 60.1224 56.5143 59.0107L22.6988 31.0356C21.7304 30.2059 21.7754 28.6941 22.7914 27.9234L56.607 2.27334C57.9241 1.2743 59.8157 3.21369 59.8157 4.86679Z" />
      )
      break
    case 'magicNumber':
      content = (
        <path d="M28.0979 2.8541C28.6966 1.01147 31.3034 1.01148 31.9021 2.8541L37.409 19.8024C37.6767 20.6265 38.4446 21.1844 39.3111 21.1844L57.1316 21.1844C59.0691 21.1844 59.8746 23.6636 58.3072 24.8024L43.8901 35.2771C43.1891 35.7864 42.8958 36.6891 43.1635 37.5132L48.6704 54.4615C49.2691 56.3041 47.1601 57.8364 45.5927 56.6976L31.1756 46.2229C30.4746 45.7136 29.5254 45.7136 28.8244 46.2229L14.4073 56.6976C12.8399 57.8364 10.7309 56.3041 11.3296 54.4615L16.8365 37.5132C17.1042 36.6891 16.8109 35.7864 16.1099 35.2771L1.69281 24.8024C0.125385 23.6636 0.93094 21.1844 2.86839 21.1844L20.6889 21.1844C21.5554 21.1844 22.3233 20.6265 22.591 19.8024L28.0979 2.8541Z" />
      )
      break
    case 'luckyNumber':
      content = (
        <g>
          <path d="M31.3277 23.8256C30.5716 24.495 29.4284 24.495 28.6723 23.8256C20.3044 16.4162 16 12.3836 16 7.48911C16 3.40414 19.332 0 23.532 0C25.3098 0 26.9542 0.466935 28.3272 1.3292C29.3213 1.95351 30.6791 1.95452 31.6712 1.32703C33.0324 0.466154 34.6396 0 36.3 0C40.5 0 44 3.24074 44 7.32571C44 12.3756 39.6956 16.4158 31.3277 23.8256Z" />{' '}
          <path d="M23.8256 28.6723C16.4158 20.3044 12.3756 16 7.32571 16C3.24074 16 0 19.5 0 23.7C0 25.3604 0.466154 26.9676 1.32703 28.3288C1.95452 29.3209 1.95351 30.6787 1.3292 31.6728C0.466935 33.0458 0 34.6902 0 36.468C0 40.668 3.40414 44 7.48911 44C12.3836 44 16.4162 39.6956 23.8256 31.3277C24.495 30.5716 24.495 29.4284 23.8256 28.6723Z" />{' '}
          <path d="M52.6663 44C47.6105 44 43.5657 39.695 36.1704 31.326C35.5028 30.5705 35.5028 29.4295 36.1704 28.674C43.5653 20.305 47.6025 16 52.5027 16C56.5921 16 60 19.332 60 23.532C60 25.3092 59.5328 26.9532 58.6701 28.326C58.045 29.3206 58.044 30.6798 58.6723 31.6724C59.5336 33.0333 60 34.64 60 36.3C60 40.5 56.7557 44 52.6663 44Z" />{' '}
          <path d="M28.6723 36.1744C20.3044 43.5842 16 47.6244 16 52.6743C16 56.7593 19.5 60 23.7 60C25.3604 60 26.9676 59.5338 28.3288 58.673C29.3209 58.0455 30.6787 58.0465 31.6728 58.6708C33.0458 59.5331 34.6902 60 36.468 60C40.668 60 44 56.5959 44 52.5109C44 47.6164 39.6956 43.5838 31.3277 36.1744C30.5716 35.505 29.4284 35.505 28.6723 36.1744Z" />
        </g>
      )
      break
    case 'goodPrime':
      content = (
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M56.5769 8.3107C58.6144 9.73375 59.1126 12.5391 57.6895 14.5766L28.3562 56.5766C27.5333 57.7549 26.197 58.4693 24.7601 58.499C23.3232 58.5288 21.9585 57.8704 21.0875 56.7272L2.4208 32.2272C0.914609 30.2503 1.29617 27.4267 3.27304 25.9206C5.24992 24.4144 8.07349 24.7959 9.57968 26.7728L24.5088 46.3673L50.311 9.42334C51.734 7.3858 54.5394 6.88766 56.5769 8.3107Z"
        />
      )
      break
    case 'happyNumber':
      content = (
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60ZM17.5 23C22.5 23 24 26.7467 24 21.5C24 16.2533 21.0899 12 17.5 12C13.9101 12 11 16.2533 11 21.5C11 26.7467 12.5 23 17.5 23ZM49 21.5C49 26.7467 47 23 42.5 23C37.5 23 36 26.7467 36 21.5C36 16.2533 38.9101 12 42.5 12C46.0899 12 49 16.2533 49 21.5ZM46.2319 43.3569C47.5336 41.5719 47.566 37.7644 45.3569 37.7681C40 37.7771 34.5 37.7681 13.6309 37.7771C11.8509 39.0855 11.4687 41.5892 12.7771 43.3691C21.4195 55.1263 38.0116 54.6293 46.2319 43.3569Z"
        />
      )
      break
    case 'untouchableNumber':
      content = (
        <path d="M8.82854 2.17134C7.26645 0.609247 4.73379 0.609247 3.17169 2.17134C1.60959 3.73344 1.60959 6.2661 3.17169 7.8282L24.8433 29.4998L3.17157 51.1715C1.60948 52.7336 1.60948 55.2662 3.17157 56.8283C4.73367 58.3904 7.26633 58.3904 8.82843 56.8283L30.5001 35.1566L52.1717 56.8282C53.7338 58.3903 56.2664 58.3903 57.8285 56.8282C59.3906 55.2661 59.3906 52.7334 57.8285 51.1713L36.157 29.4998L57.8284 7.82836C59.3905 6.26626 59.3905 3.7336 57.8284 2.1715C56.2663 0.609404 53.7336 0.609406 52.1715 2.1715L30.5001 23.8429L8.82854 2.17134Z" />
      )
      break
    case 'semiperfectNumber':
      content = (
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M42.707 1.00008C44.9162 1.00008 46.707 2.79094 46.707 5.00008V55.5859C46.707 57.795 44.9162 59.5859 42.707 59.5859C40.4979 59.5859 38.707 57.795 38.707 55.5859V40.2427L26.8283 52.1214C25.2663 53.6835 22.7336 53.6835 21.1715 52.1214C19.6094 50.5593 19.6094 48.0266 21.1715 46.4645L33.3431 34.293H17C14.7909 34.293 13 32.5021 13 30.293C13 28.0838 14.7909 26.293 17 26.293H32.3431L21.1715 15.1214C19.6094 13.5593 19.6094 11.0266 21.1715 9.46455C22.7336 7.90245 25.2663 7.90245 26.8284 9.46455L38.707 21.3432V5.00008C38.707 2.79094 40.4979 1.00008 42.707 1.00008Z"
        />
      )
      break
    case 'harshadNumber':
      content = (
        <>
          <path d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8Z" />
          <path d="M3.17157 57.8284C1.60948 56.2663 1.60948 53.7337 3.17157 52.1716L52.1715 3.1716C53.7336 1.60951 56.2663 1.6095 57.8284 3.1716C59.3905 4.7337 59.3905 7.26636 57.8284 8.82846L8.82843 57.8284C7.26633 59.3905 4.73367 59.3905 3.17157 57.8284Z" />
          <path d="M52 60C56.4183 60 60 56.4183 60 52C60 47.5817 56.4183 44 52 44C47.5817 44 44 47.5817 44 52C44 56.4183 47.5817 60 52 60Z" />
        </>
      )
      break
    case 'evilNumber':
      content = (
        <path d="M28.3175 2.61703L22.9808 10.9185C22.1252 12.2495 23.0809 14 24.6632 14H25.9998V26.0001H18.9998C15.686 26.0001 12.9998 23.3138 12.9998 20.0001V14.0001H13.4458C15.0051 14.0001 15.9646 12.295 15.1554 10.9621L12.9998 7.4117V7.00006H12.7498L10.2094 2.81587C9.43063 1.53314 7.56908 1.53314 6.79028 2.81586L1.84433 10.9621C1.0351 12.295 1.99463 14.0001 3.5539 14.0001H4.99976V20.0001C4.99976 27.732 11.2678 34.0001 18.9998 34.0001H25.9998V56.0001C25.9998 58.2092 27.7906 60.0001 29.9998 60.0001C32.2089 60.0001 33.9998 58.2092 33.9998 56.0001V34.0001H41.9998C49.7317 34.0001 55.9998 27.732 55.9998 20.0001V14.0001H56.4458C58.0051 14.0001 58.9646 12.295 58.1554 10.9621L55.9998 7.4117V7.00006H55.7498L53.2094 2.81587C52.4306 1.53314 50.5691 1.53314 49.7903 2.81586L44.8443 10.9621C44.0351 12.295 44.9946 14.0001 46.5539 14.0001H47.9998V20.0001C47.9998 23.3138 45.3135 26.0001 41.9998 26.0001H33.9998V14H35.3365C36.9189 14 37.8745 12.2495 37.0189 10.9185L31.6822 2.61703C30.8949 1.39239 29.1048 1.39239 28.3175 2.61703Z" />
      )
      break
    case 'prime':
      content = <circle cx="30" cy="30" r="30" />
      break
    case 'composite':
      content = <circle className="stroke" cx="30" cy="30" r="26" />
      break
    default:
      throw new Error('wtf')
  }

  return (
    <svg
      width={width}
      height={height}
      y={y}
      x={x}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {content}
    </svg>
  )
}
