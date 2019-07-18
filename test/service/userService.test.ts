import {UserRepository} from "../../src/repository/userRepository";
import {UserService, UserServiceImpl} from "../../src/service/userService";
import {mock, when, instance, resetCalls, deepEqual, strictEqual} from "ts-mockito";
import UserTestBuilder from "../utils/userTestBuilder";
import {verify} from "../../../ATBackend/node_modules/ts-mockito";
import {User} from "../../src/entity/user";
import {NotFound} from "../../src/utils/exceptions";

describe('UserService', () => {

  let userRepository: UserRepository;
  let mockedUserService: UserService;
  let userService: UserService;

  const testUserList = UserTestBuilder.createListOfDefaultUsers(5);

  beforeAll(async done => {
    userRepository = mock(UserRepository);
    // userService = new UserServiceImpl(userRepository);

    mockedUserService = mock(UserServiceImpl);
    userService = instance(mockedUserService);

    done();
  });

  describe('getAll', () => {

    it('should get all', async () => {

      userService = instance(mockedUserService);

      when(mockedUserService.getAll()).thenReturn(Promise.resolve(testUserList));
      const actual = await userService.getAll();
      verify(mockedUserService.getAll()).called();
      expect(actual).toHaveLength(5);
    });

    it('should get user by id', async () => {
      when(mockedUserService.getUserById("1")).thenResolve(UserTestBuilder.createUser());

      const actual = await userService.getUserById("1");
      verify(mockedUserService.getUserById("1")).called();
      expect(actual).toHaveProperty("name");
      expect(actual).toHaveProperty("email");
      expect(actual).toStrictEqual(UserTestBuilder.createUser());
      expect(actual).toBeInstanceOf(User);
      resetCalls(mockedUserService);
    });

    it('should catch error if there is any', async () => {

      userService = instance(mockedUserService);
      when(mockedUserService.getUserById("2")).thenReturn(null);
      const actual = await userService.getUserById("2");
      verify(mockedUserService.getUserById("2")).called();
      expect(actual).toBeNull();
      resetCalls(mockedUserService);
    });

    // it('save user', async () => {
    //   userService = instance(mockedUserService);
    //
    //   when(mockedUserService.save(deepEqual(UserTestBuilder.createUser())))
    //     .thenResolve(UserTestBuilder.createUser());
    //   const actual = await userService.save(deepEqual(UserTestBuilder.createUser()));
    //   verify(mockedUserService.save(UserTestBuilder.createUser())).called();
    //   expect(actual).toHaveProperty("email");
    //   resetCalls(mockedUserService);
    // });

  });
});